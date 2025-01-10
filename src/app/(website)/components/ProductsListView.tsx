"use client";

import { parseQuery } from "../products/url";
import {
  Chip,
  CircularProgress,
  CloseIcon,
  IconButton,
  Sheet,
  Tab,
  Tabs,
  TextField,
  TuneIcon,
  Typography,
} from "@firecms/ui";
import { useCallback, useEffect, useRef, useState } from "react";

import ProductPreviewCard from "@/app/common/components/ProductPreviewCard";
import { getProducts } from "@/app/common/database";
import { ProductCategory, ProductWithId } from "@/app/common/types";

export function ProductsListView({
  initialProducts,
  initialCategoryFilter,
  initialPriceMin,
  initialPriceMax,
}: {
  initialProducts: ProductWithId[];
  initialCategoryFilter?: string;
  initialPriceMin?: number;
  initialPriceMax?: number;
}) {
  const limit = useRef(initialProducts.length);
  const noMoreToLoad = useRef(false);
  const [products, setProducts] = useState<ProductWithId[]>(
    initialProducts ?? [],
  );
  const [loading, setLoading] = useState(false);

  const [categoryFilter, setCategoryFilter] = useState<string | undefined>(
    initialCategoryFilter ?? undefined,
  );
  const categoryFilterRef = useRef<string | undefined>(
    initialCategoryFilter ?? undefined,
  );
  const [priceMin, setPriceMin] = useState<number | undefined>(initialPriceMin);
  const priceMinRef = useRef<number | undefined>(initialPriceMin);
  const [priceMax, setPriceMax] = useState<number | undefined>(initialPriceMax);
  const priceMaxRef = useRef<number | undefined>(initialPriceMax);

  const [filtersOpen, setFiltersOpen] = useState(false);

  useEffect(() => {
    const updateFilterFromUrl = () => {
      if (typeof window !== "undefined") {
        const params = new URLSearchParams(window.location.search);
        const filters = parseQuery(params);
        categoryFilterRef.current = filters.category;
        setCategoryFilter(filters.category);
        priceMinRef.current = filters.priceMin;
        setPriceMin(filters.priceMin);
        priceMaxRef.current = filters.priceMax;
        setPriceMax(filters.priceMax);
      }
    };

    window.addEventListener("popstate", updateFilterFromUrl);

    return () => {
      window.removeEventListener("popstate", updateFilterFromUrl);
    };
  }, []);

  const loadProducts = useCallback(
    async function loadProducts() {
      const newLimit = products.length + 10;
      if (newLimit === limit.current || noMoreToLoad.current) {
        return;
      }
      limit.current = newLimit;
      setLoading(true);
      const newProducts = await getProducts({
        limit: newLimit,
        categoryFilter: categoryFilterRef.current,
        minPriceFilter: priceMinRef.current,
        maxPriceFilter: priceMaxRef.current,
      }).finally(() => setLoading(false));

      noMoreToLoad.current = newProducts.length !== newLimit;
      setProducts(newProducts);
    },
    [products.length],
  );

  useEffect(() => {
    const handleScroll = async () => {
      if (
        window.innerHeight + document.documentElement.scrollTop + 500 >=
        document.documentElement.offsetHeight
      ) {
        await loadProducts();
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [loadProducts]);

  function updatedURLFilterParams(key: string, newValue?: string) {
    const searchParams = new URLSearchParams();
    if (newValue) {
      searchParams.set(key, newValue);
    } else {
      searchParams.delete(key);
    }
    if (searchParams.size === 0) {
      window.history.replaceState({}, "", `${window.location.pathname}`);
    } else {
      window.history.replaceState(
        {},
        "",
        `${window.location.pathname}?${searchParams.toString()}`,
      );
    }
  }

  function clearFiltersFromURL() {
    window.history.replaceState({}, "", `${window.location.pathname}`);
  }

  function updateCategoriesFilter(newCategory: string | undefined) {
    categoryFilterRef.current = newCategory;
    setCategoryFilter(newCategory);
    updatedURLFilterParams("category", newCategory ?? undefined);
    setProducts([]);
    limit.current = 0;
    noMoreToLoad.current = false;
    loadProducts();
  }

  function updatePriceMinFilter(newPriceMin: number | undefined) {
    priceMinRef.current = newPriceMin;
    setPriceMin(newPriceMin);
    updatedURLFilterParams("priceMin", newPriceMin?.toString() ?? undefined);
    setProducts([]);
    limit.current = 0;
    noMoreToLoad.current = false;
    loadProducts();
  }

  function updatePriceMaxFilter(newPriceMax: number | undefined) {
    priceMaxRef.current = newPriceMax;
    setPriceMax(newPriceMax);
    updatedURLFilterParams("priceMax", newPriceMax?.toString() ?? undefined);
    setProducts([]);
    limit.current = 0;
    noMoreToLoad.current = false;
    loadProducts();
  }

  const hasFilters =
    Boolean(categoryFilter) || priceMin !== undefined || priceMax !== undefined;

  return (
    <div className={"min-h-[80dvh] w-full"}>
      <Sheet
        side={"right"}
        open={filtersOpen}
        onOpenChange={setFiltersOpen}
        className={
          "z-20 flex w-[500px] max-w-full flex-col gap-8 overflow-auto p-4 py-12"
        }
      >
        <IconButton
          className={"absolute right-4 top-4"}
          onClick={() => setFiltersOpen(false)}
        >
          <CloseIcon />
        </IconButton>
        <Typography variant={"h4"} gutterBottom={true}>
          Filters
        </Typography>

        <CategoriesFilter
          value={categoryFilter}
          setValue={updateCategoriesFilter}
        />

        <PriceFilter
          priceMin={priceMin}
          priceMax={priceMax}
          setPriceMin={updatePriceMinFilter}
          setPriceMax={updatePriceMaxFilter}
        />
      </Sheet>

      <div className={"mx-auto my-8 max-w-5xl p-4"}>
        <h1 className="typography-h4">Products</h1>

        <Typography
          variant={"subtitle1"}
          className={"mt-1 text-text-secondary"}
        >
          The best product selection
        </Typography>

        <div className={"my-4 flex w-full flex-row items-end gap-4"}>
          <Tabs
            className={"flex-grow overflow-auto"}
            innerClassName={"items-end"}
            value={categoryFilter ?? "_all"}
            onValueChange={(value) =>
              updateCategoriesFilter(value === "_all" ? undefined : value)
            }
          >
            <Tab value={"_all"} innerClassName={"p-1 m-1 mx-2"}>
              All
            </Tab>
            {categories.map((category) => (
              <Tab
                innerClassName={"p-1 m-1 mx-2"}
                key={category}
                value={category}
              >
                {labels[category]}
              </Tab>
            ))}
          </Tabs>

          <div className={"flex h-fit items-center gap-4"}>
            <div className={"flex items-center gap-2"}>
              {hasFilters && (
                <Chip
                  className={"hover:bg-surface-200"}
                  onClick={() => {
                    updateCategoriesFilter(undefined);
                    updatePriceMaxFilter(undefined);
                    updatePriceMinFilter(undefined);
                    clearFiltersFromURL();
                    setProducts([]);
                    limit.current = 0;
                    noMoreToLoad.current = false;
                    loadProducts();
                  }}
                  colorScheme={"grayLight"}
                  size={"small"}
                  icon={<CloseIcon size={"small"} />}
                >
                  Clear filters
                </Chip>
              )}
              <IconButton onClick={() => setFiltersOpen(true)}>
                <TuneIcon size={"large"} />
              </IconButton>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2 md:grid-cols-3">
          {products.map((product) => (
            <ProductPreviewCard key={product.id} product={product} />
          ))}
        </div>

        {loading && (
          <div className="my-32 min-h-full text-center">
            <CircularProgress size={"large"} />
          </div>
        )}

        {!loading && products.length === 0 && (
          <div className="my-32 min-h-full text-center">
            <Typography variant={"h5"}>No products found</Typography>
          </div>
        )}
      </div>
    </div>
  );
}

const categories: ProductCategory[] = [
  "home_storage",
  "cameras",
  "furniture",
  "kitchen",
  "sunglasses",
];

const labels: Record<ProductCategory, string> = {
  home_storage: "Home storage",
  cameras: "Cameras",
  furniture: "Furniture",
  kitchen: "Kitchen",
  sunglasses: "Sunglasses",
};

function CategoriesFilter({
  value,
  setValue,
}: {
  value?: string;
  setValue: (value?: string) => void;
}) {
  return (
    <div>
      <div className="mb-2 text-xs font-medium uppercase text-surface-accent-500 dark:text-surface-accent-300">
        Category:
      </div>
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => {
          const selected = value === category;
          return (
            <Chip
              key={category}
              size={"small"}
              colorScheme={!selected ? "grayLighter" : "pinkDarker"}
              onClick={() => setValue(selected ? undefined : category)}
            >
              {labels[category]}
            </Chip>
          );
        })}
      </div>
    </div>
  );
}

function PriceFilter({
  priceMin,
  priceMax,
  setPriceMin,
  setPriceMax,
}: {
  priceMin?: number;
  priceMax?: number;
  setPriceMin: (value?: number) => void;
  setPriceMax: (value?: number) => void;
}) {
  return (
    <div>
      <div className="mb-2 text-xs font-medium uppercase text-surface-accent-500 dark:text-surface-accent-300">
        Price:
      </div>
      <div className="flex flex-wrap gap-2">
        <TextField
          value={priceMin}
          onChange={(e) => setPriceMin(parseFloat(e.target.value))}
          label={"Min"}
          type={"number"}
          size={"small"}
        />
        <TextField
          value={priceMax}
          onChange={(e) => setPriceMax(parseFloat(e.target.value))}
          label={"Max"}
          type={"number"}
          size={"small"}
        />
      </div>
    </div>
  );
}
