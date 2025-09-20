import { MetadataRoute } from 'next';
import { getAllMedia } from '@/lib/tmdb';

const BASE_URL = 'https://www.telaoculta.top';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: 'yearly', priority: 1 },
    { url: `${BASE_URL}/movies`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/series`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
  ];

  // Reduzido de 500 para 20 para evitar o timeout
  const movies = await getAllMedia('movie', 20); 
  const movieRoutes: MetadataRoute.Sitemap = movies.map((movie) => ({
    url: `${BASE_URL}/movie/${movie.id}`,
    lastModified: movie.release_date ? new Date(movie.release_date) : new Date(),
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  // Reduzido de 500 para 20 para evitar o timeout
  const series = await getAllMedia('tv', 20);
  const seriesRoutes: MetadataRoute.Sitemap = series.map((serie) => ({
    url: `${BASE_URL}/tv/${serie.id}`,
    lastModified: serie.last_air_date ? new Date(serie.last_air_date) : new Date(),
    changeFrequency: 'weekly',
    priority: 0.6,
  }));

  return [
    ...staticRoutes,
    ...movieRoutes,
    ...seriesRoutes,
  ];
}