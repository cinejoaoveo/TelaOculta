import Link from 'next/link';
import Image from 'next/image';
import { getImageUrl, Media } from '@/lib/tmdb';

interface MediaCardProps {
  media: Media;
}

export default function MediaCard({ media }: MediaCardProps) {
  // Define o link para filme ou tv (série)
  const mediaLink = `/${media.media_type || (media.title ? 'movie' : 'tv')}/${media.id}`;
  
  return (
    <Link href={mediaLink} className="block group">
      <div className="relative rounded-lg overflow-hidden shadow-lg transform transition-transform duration-300 group-hover:scale-105">
        <Image
          src={getImageUrl(media.poster_path, 'w500')}
          alt={media.title || media.name || 'Media Poster'}
          width={500}
          height={750}
          className="w-full h-full object-cover aspect-[2/3] bg-gray-800"
        />
        {/* Gradiente para garantir a legibilidade do texto */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
        
        {/* Título sempre visível */}
        <div className="absolute bottom-0 left-0 right-0 p-2 md:p-3">
          <h3 className="font-bold text-white text-sm md:text-base drop-shadow-md line-clamp-2">
            {media.title || media.name}
          </h3>
        </div>
      </div>
    </Link>
  );
}
