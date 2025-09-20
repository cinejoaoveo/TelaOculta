export interface Media {
  id: number;
  title?: string;
  name?: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  vote_average: number;
  release_date?: string;
  first_air_date?: string;
  media_type?: 'movie' | 'tv';
  genre_ids?: number[];
}

// ... (o resto das suas interfaces: MediaRow, Movie, Series, etc. continuam aqui)
export interface MediaRow {
  title: string;
  items: Media[];
}

export interface Movie extends Media {
  runtime: number;
}

export interface Series extends Media {
  number_of_seasons: number;
  seasons: Season[];
}

export interface Season {
  id: number;
  name: string;
  season_number: number;
}

export interface Episode {
    id: number;
    name: string;
    overview: string;
    still_path: string;
    episode_number: number;
    vote_average: number;
}

export interface CastMember {
  id: number;
  name: string;
  character: string;
  profile_path: string;
}

export interface Credits {
  cast: CastMember[];
}


const API_KEY = '06c4ad81ee9f810d3547bf95fd227bd4';
const BASE_URL = 'https://api.themoviedb.org/3';

// Gêneros para referência
const GENRES = {
  ANIMATION: '16',
  FAMILY: '10751',
  SOAP: '10766', // Novelas
};

async function fetchData<T>(endpoint: string, params: Record<string, string> = {}): Promise<T> {
  const queryParams = new URLSearchParams({
    api_key: API_KEY,
    language: 'pt-BR',
    ...params,
  });
  const url = `${BASE_URL}/${endpoint}?${queryParams.toString()}`;
  const response = await fetch(url, { next: { revalidate: 3600 } });
  if (!response.ok) {
    throw new Error('Failed to fetch data from TMDB');
  }
  return response.json();
}

export function getImageUrl(path: string | null, size: 'w500' | 'original' = 'w500'): string {
    if (!path) {
      return 'https://via.placeholder.com/500x750.png?text=No+Image';
    }
    return `https://image.tmdb.org/t/p/${size}${path}`;
}

// NOVA FUNÇÃO para buscar por categorias específicas
export async function discoverMedia(mediaType: 'movie' | 'tv', params: Record<string, string>): Promise<Media[]> {
    const data = await fetchData<{ results: Media[] }>(`discover/${mediaType}`, params);
    return data.results.map(m => ({ ...m, media_type: mediaType }));
}

// Funções existentes...
export async function getTrendingMovies(): Promise<Media[]> {
  const data = await fetchData<{ results: Media[] }>('trending/movie/week');
  return data.results.map(m => ({...m, media_type: 'movie'}));
}

export async function getMediaRows(): Promise<MediaRow[]> {
    const [popularMovies, topRatedMovies, popularSeries, topRatedSeries] = await Promise.all([
        fetchData<{ results: Media[] }>('movie/popular'),
        fetchData<{ results: Media[] }>('movie/top_rated'),
        fetchData<{ results: Media[] }>('tv/popular'),
        fetchData<{ results: Media[] }>('tv/top_rated')
    ]);

    return [
        { title: 'Filmes Populares', items: popularMovies.results.map(m => ({...m, media_type: 'movie'})) },
        { title: 'Séries Populares', items: popularSeries.results.map(m => ({...m, media_type: 'tv'})) },
        { title: 'Filmes Bem Avaliados', items: topRatedMovies.results.map(m => ({...m, media_type: 'movie'})) },
        { title: 'Séries Bem Avaliadas', items: topRatedSeries.results.map(m => ({...m, media_type: 'tv'})) }
    ];
}

export async function getMovieDetails(id: number): Promise<Movie> {
  return fetchData<Movie>(`movie/${id}`);
}

export async function getSeriesDetails(id: number): Promise<Series> {
  return fetchData<Series>(`tv/${id}`);
}

export async function getCredits(mediaType: 'movie' | 'tv', id: number): Promise<Credits> {
  return fetchData<Credits>(`${mediaType}/${id}/credits`);
}

export async function getRecommendations(mediaType: 'movie' | 'tv', id: number): Promise<Media[]> {
  const data = await fetchData<{ results: Media[] }>(`${mediaType}/${id}/recommendations`);
  return data.results.map(m => ({ ...m, media_type: mediaType }));
}

export async function getSeasonDetails(tvId: number, seasonNumber: number): Promise<{ episodes: Episode[] }> {
    return fetchData<{ episodes: Episode[] }>(`tv/${tvId}/season/${seasonNumber}`);
}

export async function searchMedia(query: string): Promise<Media[]> {
  const data = await fetchData<{ results: Media[] }>('search/multi', { query });
  return data.results
    .filter(item => (item.media_type === 'movie' || item.media_type === 'tv') && item.poster_path)
    .map(item => ({ ...item, media_type: item.media_type as 'movie' | 'tv' }));
}

// IDs de Gênero exportados para uso nas páginas
export { GENRES };
// Adicione esta função no final do arquivo
export async function getAllMedia(mediaType: 'movie' | 'tv', totalPages: number): Promise<{ id: number; release_date?: string; first_air_date?: string; last_air_date?: string, name?: string, title?: string }[]> {
  let allItems: any[] = [];
  // A API do TMDB permite no máximo 500 páginas
  const pagesToFetch = Math.min(totalPages, 500); 

  for (let i = 1; i <= pagesToFetch; i++) {
    try {
      const data = await fetchData<{ results: any[] }>(`${mediaType}/popular`, { page: String(i) });
      if (data.results) {
        allItems = allItems.concat(data.results);
      }
    } catch (error) {
      console.error(`Failed to fetch page ${i} for ${mediaType}:`, error);
      // Continua para a próxima página em caso de erro
    }
  }
  return allItems.map(item => ({ 
    id: item.id, 
    release_date: item.release_date,
    first_air_date: item.first_air_date,
    last_air_date: item.last_air_date,
    name: item.name,
    title: item.title,
  }));
}