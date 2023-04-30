import { BlogEntry } from "../types";
import * as uuid from "uuid";
import {
    DynamoDBClient,
    PutItemCommand,
    GetItemCommand,
    DeleteItemCommand,
    UpdateItemCommand,
    ScanCommand,
    AttributeValue,
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

export const getPost = async (url: string) => {
    const { Item } = await client.send(
        new GetItemCommand({
            TableName: process.env.POST_TABLE,
            Key: {
                url: { S: url },
            },
        })
    );
    return itemParser(Item);
};

export const getPosts = async () => {
    const Items = await client.send(
        new ScanCommand({
            TableName: process.env.POST_TABLE,
        })
    );
    return Items?.Items?.map((item: any) => itemParser(item)) as BlogEntry[];
};

export const updateComments = async (url: string, comments: string) => {
    const Item = await client.send(
        new UpdateItemCommand({
            TableName: process.env.POST_TABLE,
            Key: {
                url: { S: url },
            },
            UpdateExpression: "set comments = :s",
            ExpressionAttributeValues: {
                ":s": { S: comments },
            },
        })
    );
    return Item;
};

export const deletePost = async (url: string) => {
    await client.send(
        new DeleteItemCommand({
            TableName: process.env.POST_TABLE,
            Key: {
                url: { S: url },
            },
        })
    );
};

export const putPost = async (blog: BlogEntry) => {
    const newItem = {
        id: { S: uuid.v4() },
        title: {
            S: blog.title,
        },
        content: {
            S: blog.content,
        },
        date: {
            S: moment().toISOString(),
        },
        isDraft: {
            BOOL: blog?.isDraft || false,
        },
        url: {
            S: blog.url,
        },
        images: {
            S: JSON.stringify(blog.images),
        },
        description: {
            S: blog.description,
        },
        comments: {
            S: "",
        },
    };
    await client.send(
        new PutItemCommand({
            TableName: process.env.POST_TABLE || "",
            Item: newItem,
        })
    );
    return newItem;
};
