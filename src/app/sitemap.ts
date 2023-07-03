import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: 'https://martinhanak.com/',
            lastModified: new Date(),
        },
        {
            url: 'https://martinhanak.com/en',
            lastModified: new Date(),
        },
        {
            url: 'https://martinhanak.com/cs',
            lastModified: new Date(),
        }
    ]
}