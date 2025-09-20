import { discoverMedia, Media } from '@/lib/tmdb';
import MediaCard from '@/components/MediaCard';

interface CategoryPageProps {
  title: string;
  mediaType: 'movie' | 'tv';
  fetchParams: Record<string, string>;
}

export default async function CategoryPage({ title, mediaType, fetchParams }: CategoryPageProps) {
  const items = await discoverMedia(mediaType, fetchParams);

  return (
    <div className="pt-24 px-4 md:px-16 pb-12 min-h-screen">
      <h1 className="text-4xl font-bold mb-8">{title}</h1>
      
      {items.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
          {items.map((item) => (
            <MediaCard key={item.id} media={item} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-gray-400 text-lg">Nenhum item encontrado nesta categoria.</p>
        </div>
      )}
    </div>
  );
}