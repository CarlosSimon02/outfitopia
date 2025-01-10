import { Button, CircularProgress, OpenInNewIcon } from "@firecms/ui";
import Link from "next/link";
import React, { useEffect } from "react";

import { ProductDetailView } from "@/app/common/components/ProductDetailView";
import { convertProduct } from "@/app/common/database";
import { Product, ProductWithId } from "@/app/common/types";

export function CMSProductPreview({
  product,
  id,
}: {
  product?: Product;
  id: string;
}) {
  const [convertedProduct, setConvertedProduct] =
    React.useState<ProductWithId | null>(null);
  useEffect(() => {
    if (product) convertProduct(product, id).then(setConvertedProduct);
  }, [product, id]);

  if (!convertedProduct) {
    return <CircularProgress />;
  }

  return (
    <div className={"bg-surface-50 dark:bg-surface-900"}>
      <div className={"flex w-full justify-end p-4"}>
        <Link href={"/products/" + id} target={"_blank"}>
          <Button variant={"outlined"} size={"small"}>
            <OpenInNewIcon /> See product in website
          </Button>
        </Link>
      </div>
      <ProductDetailView product={convertedProduct} />
    </div>
  );
}
