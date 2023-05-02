module.exports = {
    siteUrl: 'https://zmelen.dev',
    generateRobotsTxt: true,
    exclude: ['/server-sitemap.xml', '/create'],
    robotsTxtOptions: {
        policies: [
            {
                userAgent: "*",
                allow: "/",
            },
        ],
        additionalSitemaps: [
            'https://zmelen.dev/server-sitemap.xml', // <==== Add here
        ],
    },
    transform: async (_, path) => ({
        loc: path,
        changefreq: "daily",
        lastmod: new Date().toISOString(),
    }),
    additionalPaths: async (config) => {
        const result = [];

        result.push(await config.transform(config, "/posts"));

        return result;
    }
};
