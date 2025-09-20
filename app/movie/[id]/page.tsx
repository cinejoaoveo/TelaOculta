import MovieDetailClient from "@/components/MovieDetailClient";

export default function MovieDetailPage({ params }: { params: { id: string } }) {
  const movieId = Number(params.id);

  // A página agora simplesmente renderiza o componente de cliente,
  // passando o ID do filme como uma prop.
  return <MovieDetailClient movieId={movieId} />;
}