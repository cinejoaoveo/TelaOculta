import CategoryPage from "@/app/CategoryPage";

export default function DoramasPage() {
  return (
    <CategoryPage
      title="Doramas"
      mediaType="tv"
      fetchParams={{ with_original_language: 'ko' }}
    />
  );
}