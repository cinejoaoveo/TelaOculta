import Link from 'next/link';
import Image from 'next/image';
import { getImageUrl, Media } from '@/lib/tmdb';

interface MediaCardProps {
  media: Media;
}

export default function MediaCard({ media }: MediaCardProps) {
  const mediaLink = `/${media.media_type}/${media.id}`;
  
  return (
    <Link href={mediaLink} className="block group relative rounded-lg overflow-hidden shadow-lg transform transition-transform duration-300 hover:scale-110 hover:z-20">
      <Image
        src={getImageUrl(media.poster_path, 'w500')}
        alt={media.title || media.name || 'Media Poster'}
        width={500}
        height={750}
        className="w-full h-full object-cover aspect-[2/3] bg-gray-800 transition-all duration-300 group-hover:blur-sm group-hover:brightness-50"
      />
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
        <div className="w-full h-full flex items-center justify-center">
          {/* IMAGEM CORRIGIDA AQUI */}
          <Image
            src="https://i.ibb.co/Q7V0pybV/bot-o-play-sem-bg.png"
            alt="Play"
            width={80}
            height={80}
            className="w-20 h-20 object-contain drop-shadow-lg transform scale-75 group-hover:scale-100 transition-transform duration-300"
          />
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-3">
          <h3 className="font-bold text-white drop-shadow-md line-clamp-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
            {media.title || media.name}
          </h3>
        </div>
      </div>
    </Link>
  );
}