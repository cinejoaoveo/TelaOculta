import { getSeriesDetails, getCredits, getImageUrl, getSeasonDetails } from '@/lib/tmdb';
import Image from 'next/image';
import Link from 'next/link';

// Componente para a lista de episódios (para organizar o código)
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
                        {/* IMAGEM CORRIGIDA AQUI */}
                        <Image src="https://i.ibb.co/hRR6bVmk/Tela-Oculta-Icon.png" alt="Play Episode" width={48} height={48} className="w-12 h-12 object-contain transition-transform duration-300 hover:scale-110" />
                    </Link>
                </div>
            ))}
        </div>
    );
}

// ... (o resto do arquivo continua igual)
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
        <div className="md:flex md:space-x-8">
          <div className="flex-shrink-0 w-48 md:w-64 mx-auto md:mx-0">
            <Image
              src={getImageUrl(series.poster_path, 'w500')}
              alt={series.name || 'Poster'}
              width={500}
              height={750}
              className="rounded-lg shadow-2xl"
            />
          </div>
          <div className="flex-grow pt-8 md:pt-16 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold">{series.name}</h1>
            <div className="flex items-center justify-center md:justify-start space-x-4 my-4 text-gray-300">
              <span>{series.first_air_date?.substring(0, 4)}</span>
              <span>{series.number_of_seasons} Temporada(s)</span>
            </div>
            <p className="text-gray-300 md:text-lg mb-6">{series.overview}</p>
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