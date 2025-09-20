'use client';

import { useState, useMemo } from 'react';

// Definimos os tipos de fontes de vídeo que teremos
type PlayerSource = 'superflix' | 'primevicio';

interface PlayerProps {
  mediaType: 'movie' | 'tv';
  id: string;
  season?: string;
  episode?: string;
  title: string;
}

export default function Player({ mediaType, id, season, episode, title }: PlayerProps) {
  // Estado para controlar a fonte do player selecionada, começando com 'superflix'
  const [source, setSource] = useState<PlayerSource>('superflix');

  // Gera a URL do player com base na fonte selecionada e nos dados da mídia
  const playerUrl = useMemo(() => {
    if (mediaType === 'movie') {
      if (source === 'superflix') {
        return `https://superflixapi.asia/filme/${id}`;
      } else if (source === 'primevicio') {
        return `https://primevicio.vercel.app/embed/movie/${id}`;
      }
    } else if (mediaType === 'tv' && season && episode) {
      if (source === 'superflix') {
        return `https://superflixapi.asia/serie/${id}/${season}/${episode}/`;
      } else if (source === 'primevicio') {
        return `https://primevicio.vercel.app/embed/tv/${id}/${season}/${episode}`;
      }
    }
    return ''; // Retorna vazio se não houver URL
  }, [source, mediaType, id, season, episode]);

  // Função para aplicar estilo dinâmico ao botão ativo
  const getButtonClass = (buttonSource: PlayerSource) => {
    return source === buttonSource
      ? 'bg-pink-600 text-white' // Estilo do botão ativo
      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'; // Estilo do botão inativo
  };

  return (
    <div className="pt-24 container mx-auto px-4 md:px-8 pb-12">
      <h1 className="text-2xl md:text-4xl font-bold mb-4">{title}</h1>

      {/* Botões de Seleção de Player */}
      <div className="flex items-center space-x-4 mb-4">
        <button
          onClick={() => setSource('superflix')}
          className={`px-5 py-2 rounded-full font-semibold transition-colors duration-200 ${getButtonClass('superflix')}`}
        >
          Servidor 1
        </button>
        <button
          onClick={() => setSource('primevicio')}
          className={`px-5 py-2 rounded-full font-semibold transition-colors duration-200 ${getButtonClass('primevicio')}`}
        >
          Servidor 2
        </button>
      </div>

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
            // O atributo SANDBOX foi REMOVIDO para evitar o bloqueio
            className="w-full h-full"
          ></iframe>
        </div>
      )}
    </div>
  );
}