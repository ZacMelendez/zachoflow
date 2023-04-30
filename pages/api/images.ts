import S3 from "aws-sdk/clients/s3";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const session = await getServerSession(req, res, authOptions);

    if (!session) return res.status(401).json({ error: "unauthorized" });

    const s3 = new S3({
        apiVersion: "2006-03-01",
        accessKeyId: process.env.AWS_KEY,
        secretAccessKey: process.env.AWS_SECRET,
        ...(process.env.NODE_ENV !== "production" && {
            endpoint: "http://localhost:4566",
        }),
    });
    try {
        if (req.method !== "GET") {
            return res.status(405).json({ err: "method not allowed" });
        }
        const post = await s3.createPresignedPost({
            Bucket: process.env.BUCKET_NAME,
            Fields: {
                key: `images/${req.query.postId}/${req.query.file}`,
                "Content-Type": req.query.fileType,
            },
            Expires: 60, // seconds
            Conditions: [
                ["content-length-range", 0, 1048576], // up to 1 MB
            ],
        });

        res.status(200).json(post);
    } catch (err) {
        console.error(err);
        res.status(500).json({ err: JSON.stringify(err) });
    }
}
