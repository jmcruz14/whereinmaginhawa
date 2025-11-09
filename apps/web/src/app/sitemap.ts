import { MetadataRoute } from 'next';
import { getAllPlaces } from '@/lib/places';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://whereinmaginhawa.com';
  const places = getAllPlaces();

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/places`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
  ];

  // Dynamic place pages
  const placePages: MetadataRoute.Sitemap = places.map((place) => ({
    url: `${baseUrl}/places/${place.slug}`,
    lastModified: new Date(place.updatedAt),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  return [...staticPages, ...placePages];
}
