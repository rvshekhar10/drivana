import { MetadataRoute } from "next";
import carsData from "@/data/cars.json";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://drivana.in";

  const carPages = carsData.map((car) => ({
    url: `${baseUrl}/cars/${car.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...carPages,
  ];
}
