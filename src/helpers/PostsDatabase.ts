import { BlogEntry } from "../types";
import * as uuid from "uuid";
import {
    DynamoDBClient,
    PutItemCommand,
    GetItemCommand,
    DeleteItemCommand,
    UpdateItemCommand,
    ScanCommand,
} from "@aws-sdk/client-dynamodb";
import moment from "moment";
import fetch from "node-fetch";

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

const imageCreator = async ({ title, id }: { title: string; id: string }) => {
    await fetch(
        "https://km9zsdl2nk.execute-api.us-east-1.amazonaws.com/Prod/api",
        {
            method: "POST",
            body: JSON.stringify({
                id,
                title,
            }),
        }
    );
};

const clientOptions = {
    region: "us-east-1",
    credentials: {
        accessKeyId: process.env.AWS_KEY || "",
        secretAccessKey: process.env.AWS_SECRET || "",
    },
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

interface UpdatePostProps {
    description?: string;
    images?: string;
    content?: string;
}

export const updatePost = async (post: BlogEntry) => {
    const Item = await client.send(
        new UpdateItemCommand({
            TableName: process.env.POST_TABLE,
            Key: {
                url: { S: post.url },
            },
            UpdateExpression: "set description = :d, images = :i, content = :c",
            ExpressionAttributeValues: {
                ":d": { S: post.description },
                ":i": { S: JSON.stringify(post.images) },
                ":c": { S: post.content },
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

    await imageCreator({ id: newItem.id.S, title: blog.title });

    await client.send(
        new PutItemCommand({
            TableName: process.env.POST_TABLE || "",
            Item: newItem,
        })
    );
    return newItem;
};
