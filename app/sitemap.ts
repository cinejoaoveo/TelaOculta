import { MetadataRoute } from 'next';
import { getAllMedia } from '@/lib/tmdb';

const BASE_URL = 'https://www.telaoculta.top';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: 'yearly', priority: 1 },
    { url: `${BASE_URL}/movies`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/series`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/animacoes`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: `${BASE_URL}/animes`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: `${BASE_URL}/novelas`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: `${BASE_URL}/doramas`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
  ];

  // O NÚMERO MÁXIMO DE PÁGINAS QUE A API DO TMDB PERMITE É 500.
  // Usar 500 aqui garante o sitemap mais completo possível.
  const movies = await getAllMedia('movie', 500); 
  const movieRoutes: MetadataRoute.Sitemap = movies.map((movie) => ({
    url: `${BASE_URL}/movie/${movie.id}`,
    lastModified: movie.release_date ? new Date(movie.release_date) : new Date(),
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  const series = await getAllMedia('tv', 500);
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