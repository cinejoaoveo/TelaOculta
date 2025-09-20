import CategoryPage from "@/app/CategoryPage";
import { GENRES } from "@/lib/tmdb";

export default function NovelasPage() {
  return (
    <CategoryPage
      title="Novelas"
      mediaType="tv"
      fetchParams={{ with_genres: GENRES.SOAP }}
    />
  );
}