import { searchMedia } from '@/lib/tmdb';
import MediaCard from '@/components/MediaCard';
import Loading from '@/components/Loading';
import { Suspense } from 'react';

// Componente que lida com a busca e exibe os resultados
async function SearchResults({ query }: { query: string }) {
  if (!query) {
    return <p className="text-gray-400 text-center">Digite algo para buscar.</p>;
  }

  const results = await searchMedia(query);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">
        Resultados para: <span className="text-pink-500">{query}</span>
      </h1>
      {results.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
          {results.map((item) => (
            <MediaCard key={item.id} media={item} />
          ))}
        </div>
      ) : (
        <p className="text-gray-400 text-center">Nenhum resultado encontrado.</p>
      )}
    </div>
  );
}

// A página de busca que será renderizada
export default function SearchPage({ searchParams }: { searchParams: { q: string } }) {
  const query = searchParams.q || '';

  return (
    <div className="pt-24 px-4 md:px-16 pb-12 min-h-screen">
      <Suspense fallback={<div className="flex justify-center pt-16"><Loading /></div>}>
        <SearchResults query={query} />
      </Suspense>
    </div>
  );
}