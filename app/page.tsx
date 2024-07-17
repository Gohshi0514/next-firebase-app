import { ArticleList } from "@/app/components/ArticleList";

export default function HomePageLayout() {
  return (
    <div className="container mx-auto px-4 py-12 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">
        最新の記事
      </h1>
      <ArticleList />
    </div>
  );
}
