export function parseQuery(params?: Map<string, string> | URLSearchParams) {
  if (!params) {
    return {};
  }

  // @ts-expect-error: params may not be indexable with string keys
  const category = params["category"];

  // @ts-expect-error: params may not be indexable with string keys
  const priceMin = parseFloat(params["priceMin"] || "");

  // @ts-expect-error: params may not be indexable with string keys
  const priceMax = parseFloat(params["priceMax"] || "");

  return {
    category: category ?? undefined,
    priceMax: isNaN(priceMax) ? undefined : priceMax,
    priceMin: isNaN(priceMin) ? undefined : priceMin,
  };
}
