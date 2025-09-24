import { getTrendingMovies, getMediaRows, getImageUrl } from '@/lib/tmdb';
import Image from 'next/image';
import Link from 'next/link';
import MediaCard from '@/components/MediaCard';

export default async function HomePage() {
  const heroItems = await getTrendingMovies();
  const mediaRows = await getMediaRows();
  const currentHeroItem = heroItems.length > 0 ? heroItems[0] : null;

  const getRating = (voteAverage: number) => Math.round(voteAverage / 2);

  return (
    <div>
      {currentHeroItem && (
        // ALTURA DO HERO AJUSTADA PARA MOBILE
        <div className="relative w-full h-[65vh] sm:h-[75vh] md:h-[85vh] text-white overflow-hidden">
          <Image
            src={getImageUrl(currentHeroItem.backdrop_path, 'original')}
            alt={currentHeroItem.title || currentHeroItem.name || 'Backdrop'}
            fill
            priority
            className="object-cover object-center w-full h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/20 to-transparent"></div>
          
          <div className="relative z-10 flex flex-col justify-end md:justify-center h-full px-4 md:px-16 pb-24 md:pb-0">
            <div className="max-w-2xl">
              <h1 className="text-4xl md:text-6xl font-bold tracking-tighter uppercase drop-shadow-lg">
                {currentHeroItem.title || currentHeroItem.name}
              </h1>
              <div className="flex items-center space-x-4 my-4 text-gray-300">
                <span>{(currentHeroItem.release_date || currentHeroItem.first_air_date)?.substring(0, 4)}</span>
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className={`w-5 h-5 ${i < getRating(currentHeroItem.vote_average) ? 'text-yellow-400' : 'text-gray-600'}`} fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                  ))}
                </div>
              </div>
              <p className="text-gray-300 line-clamp-3 md:text-lg mb-6">
                {currentHeroItem.overview}
              </p>
              <div className="flex items-center space-x-4">
                <Link href={`/player/movie/${currentHeroItem.id}`} target="_blank" className="flex items-center justify-center bg-white text-black px-6 py-3 rounded-full font-semibold hover:bg-opacity-80 transition-all duration-200">
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" /></svg>
                  Assistir
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MARGEM NEGATIVA AJUSTADA */}
      <div className="px-4 md:px-16 space-y-12 -mt-16 md:-mt-24 relative z-20 pb-12">
        {mediaRows.map((row) => (
          <section key={row.title}>
            <h2 className="text-2xl font-bold mb-4">{row.title}</h2>
            <div className="relative -mx-4 md:-mx-6">
              <div className="flex space-x-4 overflow-x-auto py-4 px-4 md:px-6 scrollbar-thin">
                {row.items.map((item) => (
                  <div key={item.id} className="flex-shrink-0 w-40 sm:w-44 md:w-52">
                    <MediaCard media={item} />
                  </div>
                ))}
              </div>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
