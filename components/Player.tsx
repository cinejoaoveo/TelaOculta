'use client';

import { useMemo } from 'react';
import { Media } from '@/lib/tmdb'; // Importar o tipo Media
import MediaCard from './MediaCard'; // Importar o MediaCard para exibir as recomendações

interface PlayerProps {
  mediaType: 'movie' | 'tv';
  id: string;
  season?: string;
  episode?: string;
  title: string;
  recommendations: Media[]; // Adicionar prop para receber as recomendações
}

export default function Player({ mediaType, id, season, episode, title, recommendations }: PlayerProps) {
  const playerUrl = useMemo(() => {
    if (mediaType === 'movie') {
      return `https://primevicio.vercel.app/embed/movie/${id}`;
    } else if (mediaType === 'tv' && season && episode) {
      return `https://primevicio.vercel.app/embed/tv/${id}/${season}/${episode}`;
    }
    return '';
  }, [mediaType, id, season, episode]);

  return (
    <div className="pt-24 container mx-auto px-4 md:px-8 pb-12">
      <h1 className="text-2xl md:text-4xl font-bold mb-4">{title}</h1>

      {/* Iframe do Player */}
      {playerUrl && (
        <div className="aspect-video w-full max-w-5xl mx-auto bg-gray-900 rounded-lg overflow-hidden shadow-2xl">
          <iframe
            key={playerUrl}
            src={playerUrl}
            title={title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            referrerPolicy="origin"
            className="w-full h-full"
          ></iframe>
        </div>
      )}

      {/* Seção de Recomendações */}
      {recommendations && recommendations.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-4">Recomendações</h2>
          <div className="relative -mx-4 md:-mx-6">
            <div className="flex space-x-4 overflow-x-auto py-4 px-4 md:px-6 scrollbar-thin">
              {recommendations.map((item) => (
                <div key={item.id} className="flex-shrink-0 w-40 md:w-52">
                  <MediaCard media={item} />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}