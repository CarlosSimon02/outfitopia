import { ProductsListView } from "../components/ProductsListView";

import { parseQuery } from "./url";
import { getProducts } from "@/app/common/database";

export default async function Page({
  params,
}: {
  params: Promise<{ searchParams: Map<string, string> | URLSearchParams }>;
}) {
  const { searchParams } = await params;
  const filters = parseQuery(searchParams);
  const products = await getProducts({
    limit: 10,
    categoryFilter: filters.category,
    minPriceFilter: filters.priceMin,
    maxPriceFilter: filters.priceMax,
  });

  console.log("Products", products);

  return (
    <ProductsListView
      initialProducts={products}
      initialCategoryFilter={filters.category}
    />
  );
}
