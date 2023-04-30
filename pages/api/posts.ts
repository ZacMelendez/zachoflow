import type { NextApiRequest, NextApiResponse } from "next";
import {
    deletePost,
    getPosts,
    putPost,
    updatePost,
} from "../../src/helpers/PostsDatabase";
import { authOptions } from "./auth/[...nextauth]";
import { getServerSession } from "next-auth";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    // const session = await getServerSession(req, res, authOptions);
    // if (!session) return res.status(401).json({ error: "unauthorized" });
    try {
        switch (req.method) {
            case "PUT":
                return res
                    .status(201)
                    .json(await putPost(JSON.parse(req.body)));
            case "GET":
                return res.status(201).json(await getPosts());
            case "POST":
                return res
                    .status(201)
                    .json(await updatePost(JSON.parse(req.body)));
            case "DELETE":
                return res
                    .status(201)
                    .json(await deletePost(JSON.parse(req.body).url));
            default:
                return res.status(400).json({ body: "invalid request" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ err: JSON.stringify(err) });
    }
}
