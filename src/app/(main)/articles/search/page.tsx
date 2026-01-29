import SearchResults from "@/app/components/Articles/searchResaults";
import { Suspense } from "react";

interface SearchPageParams {
  searchParams: Promise<{
    searchText: string;
  }>;
}

export const dynamic = "force-dynamic";

const SearchPage = async ({ searchParams }: SearchPageParams) => {
  const text = (await searchParams).searchText;
  return (
        <div className="flex justify-center mt-9">
            <div className="container">
                <h1 className="text-2xl font-bold text-center main-text-color my-10">
                    Results for: <span className="special-text">{text}</span>
                </h1>

                {/* هنا الـ Suspense يعمل بشكل صحيح لأنه يغلف مكون الـ Data Fetching فقط */}
                <Suspense key={text} fallback={<p className="text-center">Loading Articles...</p>}>
                    <SearchResults query={text} />
                </Suspense>
            </div>
        </div>
    );
}

export default SearchPage;
