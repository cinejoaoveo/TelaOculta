import CategoryPage from "@/app/CategoryPage";
import { GENRES } from "@/lib/tmdb";

export default function AnimacoesPage() {
  return (
    <CategoryPage
      title="Animações"
      mediaType="movie"
      fetchParams={{ with_genres: `${GENRES.ANIMATION},${GENRES.FAMILY}` }}
    />
  );
}