import { getSeriesDetails, getImageUrl, getSeasonDetails } from '@/lib/tmdb';
import Image from 'next/image';
import Link from 'next/link';
import type { Metadata, ResolvingMetadata } from 'next';

type Props = {
  params: { id: string }
}

// GERAÇÃO DE METADADOS DINÂMICOS PARA SEO
export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const seriesId = Number(params.id);
  const series = await getSeriesDetails(seriesId);

  const title = `TelaOculta - Assistir ${series.name || 'Série'} Online (Série Completa)`;
  const description = series.overview;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: `https://image.tmdb.org/t/p/original${series.backdrop_path}`,
          width: 1200,
          height: 630,
          alt: series.name || 'Backdrop da Série',
        },
      ],
    },
  }
}


// Componente para a lista de episódios (com o novo ícone de play)
async function SeasonEpisodes({ seriesId, seasonNumber }: { seriesId: number, seasonNumber: number }) {
    const { episodes } = await getSeasonDetails(seriesId, seasonNumber);

    return (
        <div className="space-y-4">
            {episodes.map((episode) => (
                <div key={episode.id} className="bg-gray-900/50 p-4 rounded-lg flex items-center space-x-4">
                    <div className="flex-shrink-0 w-48">
                        <Image src={getImageUrl(episode.still_path, 'w500')} alt={episode.name} width={200} height={113} className="w-full h-auto rounded object-cover bg-gray-800" />
                    </div>
                    <div className="flex-grow">
                        <h3 className="font-bold text-lg">{episode.episode_number}. {episode.name}</h3>
                        <p className="text-gray-400 text-sm line-clamp-2">{episode.overview}</p>
                    </div>
                    <Link href={`/player/tv/${seriesId}/${seasonNumber}/${episode.episode_number}`} target="_blank" className="flex-shrink-0">
                        {/* NOVO ÍCONE DE PLAY SVG */}
                        <div className="w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 transform hover:scale-110">
                            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd"></path>
                            </svg>
                        </div>
                    </Link>
                </div>
            ))}
        </div>
    );
}

export default async function SeriesDetailPage({ params, searchParams }: { params: { id: string }, searchParams: { season: string } }) {
  const seriesId = Number(params.id);
  const series = await getSeriesDetails(seriesId);
  
  const selectedSeasonNumber = Number(searchParams.season) || (series.seasons.find(s => s.season_number > 0)?.season_number || 1);

  return (
    <div className="text-white">
      <div className="relative w-full h-[50vh] md:h-[60vh]">
        <Image
          src={getImageUrl(series.backdrop_path, 'original')}
          alt={series.name || 'Backdrop'}
          fill
          priority
          className="object-cover object-top w-full h-full"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 md:px-16 pb-16 -mt-32 relative z-10">
        <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left md:space-x-8">
          <div className="flex-shrink-0 w-48 md:w-64">
            <Image
              src={getImageUrl(series.poster_path, 'w500')}
              alt={series.name || 'Poster'}
              width={500}
              height={750}
              className="rounded-lg shadow-2xl"
            />
          </div>
          <div className="flex-grow pt-8 md:pt-16">
            <h1 className="text-4xl md:text-5xl font-bold">{series.name}</h1>
            <div className="flex items-center justify-center md:justify-start space-x-4 my-4 text-gray-300">
              <span>{series.first_air_date?.substring(0, 4)}</span>
              <span>{series.number_of_seasons} Temporada(s)</span>
            </div>
            <p className="text-gray-300 md:text-lg mb-6 max-w-2xl mx-auto md:mx-0">{series.overview}</p>
          </div>
        </div>
        
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-4">Episódios</h2>
          <div className="border-b border-gray-700 mb-4">
            <nav className="flex space-x-4 -mb-px overflow-x-auto" aria-label="Tabs">
              {series.seasons.filter(s => s.season_number > 0).map((season) => (
                <Link
                  key={season.id}
                  href={`/tv/${seriesId}?season=${season.season_number}`}
                  scroll={false}
                  className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${selectedSeasonNumber === season.season_number ? 'border-pink-500 text-pink-500' : 'border-transparent text-gray-400 hover:text-white hover:border-gray-500'}`}
                >
                  {season.name}
                </Link>
              ))}
            </nav>
          </div>
          <SeasonEpisodes seriesId={seriesId} seasonNumber={selectedSeasonNumber} />
        </div>
      </div>
    </div>
  );
}
