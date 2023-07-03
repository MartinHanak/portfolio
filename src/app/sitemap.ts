import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: 'https://www.martinhanak.com/',
            lastModified: new Date(),
        },
        {
            url: 'https://www.martinhanak.com/en',
            lastModified: new Date(),
        },
        {
            url: 'https://www.martinhanak.com/cs',
            lastModified: new Date(),
        }
    ]
}