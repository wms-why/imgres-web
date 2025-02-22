import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_DOMAIN!;

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
    // {
    //   url: `${baseUrl}/price`,
    //   lastModified: new Date(),
    // },
    // {
    //   url: `${baseUrl}/refund-policy`,
    //   lastModified: "2025-01-22T02:22:06.416Z",
    // },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: "2025-01-22T02:22:06.416Z",
    },
    {
      url: `${baseUrl}/terms-of-service`,
      lastModified: "2025-01-22T02:22:06.416Z",
    },
  ];
}
