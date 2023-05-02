// pages/server-sitemap.xml/index.tsx

import { GetServerSideProps } from "next";
import { getServerSideSitemap } from "next-sitemap";
import { getPosts } from "../../src/helpers/PostsDatabase";

//@ts-ignore
// export const getServerSideProps: GetServerSideProps = async (ctx) => {
//     // Method to source urls from cms
//     // const urls = await fetch('https//example.com/api')

//     const urls = await getPosts();

//     const fields = urls
//         .filter((blog) => !blog.isDraft)
//         .map((blog) => {
//             return {
//                 loc: `https://zmelen.dev/posts/${blog.url}`,
//                 lastmod: new Date(blog.date).toISOString(),
//             };
//         });

//     // const fields = [
//     //     {
//     //         loc: "https://example.com", // Absolute url
//     //         lastmod: new Date().toISOString(),
//     //         // changefreq
//     //         // priority
//     //     },
//     //     {
//     //         loc: "https://example.com/dynamic-path-2", // Absolute url
//     //         lastmod: new Date().toISOString(),
//     //         // changefreq
//     //         // priority
//     //     },
//     // ];

//     return getServerSideSitemap(ctx, fields);
// };

// // Default export to prevent next.js errors
// export default function Sitemap() {}

import { getServerSideSitemapIndexLegacy } from "next-sitemap";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const urls = await getPosts();

    const fields = urls
        .filter((blog) => !blog.isDraft)
        .map((blog) => {
            return `https://zmelen.dev/posts/${blog.url}`;
        });

    return getServerSideSitemapIndexLegacy(ctx, fields);
};

// Default export to prevent next.js errors
export default function SitemapIndex() {}
