import { getMovieDetails, getCredits, getImageUrl } from '@/lib/tmdb';
import Image from 'next/image';
import Link from 'next/link';

// Função para gerar as estrelas de avaliação
function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center space-x-1">
      {[...Array(5)].map((_, i) => (
        <svg key={i} className={`w-5 h-5 ${i < rating ? 'text-yellow-400' : 'text-gray-600'}`} fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
        </svg>
      ))}
    </div>
  );
}

// Função para formatar o tempo de duração
function formatRuntime(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${h}h ${m}m`;
}

type MovieDetailPageProps = {
  params: { id: string };
};

// VERSÃO FINAL COM A DESCRIÇÃO NECESSÁRIA
// @ts-expect-error O Next.js está a reportar um erro de tipo incorreto para páginas async.
export default async function MovieDetailPage({ params }: MovieDetailPageProps) {
  const movieId = Number(params.id);
  const movie = await getMovieDetails(movieId);
  const credits = await getCredits('movie', movieId);

  const rating = Math.round((movie.vote_average || 0) / 2);

  return (
    <div className="text-white">
      {/* Backdrop */}
      <div className="relative w-full h-[50vh] md:h-[60vh]">
        <Image
          src={getImageUrl(movie.backdrop_path, 'original')}
          alt={movie.title || 'Backdrop'}
          fill
          priority
          className="object-cover object-top w-full h-full"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 md:px-16 pb-16 -mt-32 relative z-10">
        <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left md:space-x-8">
          {/* Poster */}
          <div className="flex-shrink-0 w-48 md:w-64">
            <Image
              src={getImageUrl(movie.poster_path, 'w500')}
              alt={movie.title || 'Poster'}
              width={500}
              height={750}
              className="rounded-lg shadow-2xl"
            />
          </div>

          {/* Details */}
          <div className="flex-grow pt-8 md:pt-16">
            <h1 className="text-4xl md:text-5xl font-bold">{movie.title}</h1>
            <div className="flex items-center justify-center md:justify-start space-x-4 my-4 text-gray-300">
              <span>{movie.release_date?.substring(0, 4)}</span>
              <span>{formatRuntime(movie.runtime)}</span>
              <StarRating rating={rating} />
            </div>
            <p className="text-gray-300 md:text-lg mb-6 max-w-2xl mx-auto md:mx-0">{movie.overview}</p>
            <div className="flex items-center justify-center md:justify-start space-x-4">
              <Link href={`/player/movie/${movie.id}`} target="_blank" className="flex items-center justify-center bg-white text-black px-6 py-3 rounded-full font-semibold hover:bg-opacity-80 transition-all duration-200">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" /></svg>
                Assistir
              </Link>
              <button className="flex items-center justify-center bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-full font-semibold hover:bg-white/30 transition-all duration-200">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
                Minha Lista
              </button>
            </div>
          </div>
        </div>
        
        {/* Cast */}
        {credits?.cast.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-4">Elenco</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {credits.cast.slice(0, 12).map((actor) => (
                <div key={actor.id} className="text-center">
                  <Image
                    src={getImageUrl(actor.profile_path, 'w500')}
                    alt={actor.name}
                    width={200}
                    height={300}
                    className="rounded-lg object-cover w-full aspect-[2/3] mb-2 bg-gray-800"
                  />
                  <p className="font-semibold">{actor.name}</p>
                  <p className="text-sm text-gray-400">{actor.character}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}