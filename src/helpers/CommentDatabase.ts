import { BlogEntry, CommentEntry } from "../types";
import * as uuid from "uuid";
import {
    DynamoDBClient,
    PutItemCommand,
    GetItemCommand,
    DeleteItemCommand,
    ScanCommand,
} from "@aws-sdk/client-dynamodb";
import moment from "moment";

const itemParser = (object: any) => {
    let obj: any = {};
    for (const property in object) {
        obj = {
            ...obj,
            [property]: object[property][Object.keys(object[property])[0]],
        };
    }
    return {
        ...obj,
        ...(obj["images"] && { images: JSON.parse(obj["images"]) }),
    };
};

const clientOptions = {
    region: process.env.NODE_ENV !== "production" ? "localhost" : "us-east-1",
    credentials: {
        accessKeyId: process.env.AWS_KEY || "",
        secretAccessKey: process.env.AWS_SECRET || "",
    },
    ...(process.env.NODE_ENV !== "production" && {
        endpoint: "http://localhost:8000",
    }),
};

const client = new DynamoDBClient(clientOptions);

export const getComment = async (url: string) => {
    const { Item } = await client.send(
        new GetItemCommand({
            TableName: process.env.COMMENT_TABLE,
            Key: {
                url: { S: url },
            },
        })
    );
    return itemParser(Item);
};

export const getComments = async (url: string) => {
    const Items = await client.send(
        new ScanCommand({
            TableName: process.env.COMMENT_TABLE,
        })
    );

    const comments = Items?.Items?.map((item: any) =>
        itemParser(item)
    ) as CommentEntry[];

    return comments.filter((comment) => comment.postUrl === url);
};

export const deleteComment = async (id: string) => {
    await client.send(
        new DeleteItemCommand({
            TableName: process.env.COMMENT_TABLE,
            Key: {
                id: { S: id },
            },
        })
    );
};

export const putComment = async ({
    content,
    blog,
    author,
    authorId,
    replyTo,
}: {
    content: string;
    blog: BlogEntry;
    author: string;
    authorId: string;
    replyTo?: string;
}) => {
    const newItem = {
        id: {
            S: uuid.v4(),
        },
        content: {
            S: content,
        },
        date: {
            S: moment().toISOString(),
        },
        postUrl: {
            S: blog.url,
        },
        author: {
            S: author,
        },
        authorId: {
            S: authorId,
        },
        replies: {
            S: JSON.stringify([]),
        },
        ...(!!replyTo && {
            replyTo: {
                S: replyTo,
            },
        }),
    };
    await client.send(
        new PutItemCommand({
            TableName: process.env.COMMENT_TABLE || "",
            Item: newItem,
        })
    );
    return itemParser(newItem) as CommentEntry;
};
