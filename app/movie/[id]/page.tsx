import MovieDetailClient from "@/components/MovieDetailClient";
import { getMovieDetails } from "@/lib/tmdb";
import type { Metadata, ResolvingMetadata } from 'next';

type Props = {
  params: { id: string }
}

// GERAÇÃO DE METADADOS DINÂMICOS PARA SEO
export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const movieId = Number(params.id);
  const movie = await getMovieDetails(movieId);

  const title = `TelaOculta - Assistir ${movie.title || 'Filme'} Online (Filme HD)`;
  const description = movie.overview;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: `https://image.tmdb.org/t/p/original${movie.backdrop_path}`,
          width: 1200,
          height: 630,
          alt: movie.title || 'Backdrop do Filme',
        },
      ],
    },
  }
}


export default function MovieDetailPage({ params }: { params: { id: string } }) {
  const movieId = Number(params.id);

  // A página agora simplesmente renderiza o componente de cliente,
  // passando o ID do filme como uma prop.
  return <MovieDetailClient movieId={movieId} />;
}
