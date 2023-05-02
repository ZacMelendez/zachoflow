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
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";

const imageCreator = async ({ title, id }: { title: string; id: string }) => {
    await fetch(
        // "/api/posts",
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
            Key: marshall({ url: url }),
        })
    );
    return Item ? unmarshall(Item) : null;
};

export const getPosts = async () => {
    const Items = await client.send(
        new ScanCommand({
            TableName: process.env.POST_TABLE,
        })
    );
    return Items?.Items?.map((item: any) => unmarshall(item)) as BlogEntry[];
};

export const updateComments = async (url: string, comments: string) => {
    const Item = await client.send(
        new UpdateItemCommand({
            TableName: process.env.POST_TABLE,
            Key: marshall({ url: url }),
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
            Key: marshall({ url: post.url }),
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
            Key: marshall({ url: url }),
        })
    );
};

export const putPost = async (blog: BlogEntry) => {
    const newItem = {
        ...blog,
        id: uuid.v4(),
        date: moment().toISOString(),
        isDraft: blog?.isDraft || false,
        images: JSON.stringify(blog.images),
    };

    await imageCreator({ id: newItem.id, title: blog.title });

    await client.send(
        new PutItemCommand({
            TableName: process.env.POST_TABLE || "",
            Item: marshall(newItem),
        })
    );
    return newItem;
};
