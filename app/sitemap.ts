import { MetadataRoute } from 'next';
import { getAllMedia } from '@/lib/tmdb';

const BASE_URL = 'https://www.telaoculta.top'; // SUBSTITUA PELO SEU DOMÍNIO QUANDO TIVER UM

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: 'yearly', priority: 1 },
    { url: `${BASE_URL}/movies`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/series`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    // Adicione outras páginas estáticas aqui
  ];

  // Buscando 10 mil filmes (500 páginas x 20 por página)
  const movies = await getAllMedia('movie', 500); 
  const movieRoutes = movies.map((movie) => ({
    url: `${BASE_URL}/movie/${movie.id}`,
    // Usa a data de lançamento se disponível
    lastModified: movie.release_date ? new Date(movie.release_date) : new Date(),
    changeFrequency: 'monthly' as 'monthly',
    priority: 0.6,
  }));

  // Buscando 10 mil séries
  const series = await getAllMedia('tv', 500);
  const seriesRoutes = series.map((serie) => ({
    url: `${BASE_URL}/tv/${serie.id}`,
    // Usa a data do último episódio, se disponível
    lastModified: serie.last_air_date ? new Date(serie.last_air_date) : new Date(),
    changeFrequency: 'weekly' as 'weekly',
    priority: 0.6,
  }));

  return [
    ...staticRoutes,
    ...movieRoutes,
    ...seriesRoutes,
  ];
}