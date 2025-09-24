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
    <Link 
      href={mediaLink} 
      className="block group relative rounded-lg overflow-hidden shadow-lg 
                 transition-shadow duration-300 hover:shadow-2xl"
    >
      <div className="relative w-full aspect-[2/3]"> {/* Container para controlar o aspect ratio */}
        <Image
          src={getImageUrl(media.poster_path, 'w500')}
          alt={media.title || media.name || 'Media Poster'}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          // Efeito de zoom e blur na imagem ao passar o mouse
          className="object-cover transition-all duration-300 
                     group-hover:scale-110 group-hover:blur-sm group-hover:brightness-50"
        />
        
        {/* Overlay com informações que aparece no Hover */}
        <div className="absolute inset-0 flex flex-col items-center justify-center 
                        opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          
          {/* Ícone de Play Personalizado */}
          <Image
            src="https://i.ibb.co/Q7V0pybV/bot-o-play-sem-bg.png"
            alt="Play Icon"
            width={80} // Tamanho fixo para o ícone
            height={80} // Tamanho fixo para o ícone
            className="object-contain" // Garante que a imagem não seja comprimida ou esticada
          />

          {/* Opcional: Se quiser o título abaixo do botão de play no hover, descomente abaixo */}
          {/* <h3 className="font-bold text-white text-base drop-shadow-md line-clamp-2 mt-2">
            {media.title || media.name}
          </h3> */}
        </div>
      </div>
    </Link>
  );
}
