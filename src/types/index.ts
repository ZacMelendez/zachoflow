export enum PostCategory {
    WEB_DEV = "WEB_DEV",
    IOT_DEV = "IOT_DEV",
    CLOUD_DEV = "CLOUD_DEV",
}

export interface BlogEntry {
    id: string;
    title: string;
    description: string;
    url: string;
    isDraft?: boolean;
    images: ImageProps[];
    date: string;
    editing?: boolean;
    content: string;
    comments: string;
    type: PostCategory;
}

export interface ImageProps {
    host: string;
    id: string;
}

export interface CommentEntry {
    id: string;
    author: string;
    authorId: string;
    postUrl: string;
    date: string;
    edited?: Boolean | string;
    replies?: string;
    replyTo: string;
    content: string;
}
