import CategoryPage from "@/app/CategoryPage";
import { GENRES } from "@/lib/tmdb";

export default function AnimesPage() {
  return (
    <CategoryPage
      title="Animes"
      mediaType="tv"
      fetchParams={{
        with_genres: GENRES.ANIMATION,
        with_original_language: 'ja'
      }}
    />
  );
}