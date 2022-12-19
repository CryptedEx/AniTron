const withImages = require('next-images');
// @ts-check
/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['s4.anilist.co', 'media.kitsu.io', 'artworks.thetvdb.com', 'official-ongoing-1.ivalice.us'],
        disableStaticImages: true
    },
    poweredByHeader: false,
    reactStrictMode: true,
    swcMinify: true,

    webpack: (config) => {
        config.module.rules.push(
            {
                test: /\.(png|jpe?g|gif|mp3|aif)$/i,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "[path][name].[ext]",
                            publicPath: "/_next",
                            outputPath: "static",
                            esModule: false
                        }
                    }
                ]
            }
        );

        return config;
    }
}

module.exports = withImages(nextConfig);