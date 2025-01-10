"use client";

import { getCurrencySymbol } from "../utils";
import { cls } from "@firecms/ui";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import { ProductWithId } from "@/app/common/types";

export interface ProductPreviewCardProps {
  product: ProductWithId;
  className?: string;
}

const ProductPreviewCard: React.FC<ProductPreviewCardProps> = ({
  product,
  className,
}) => {
  return (
    <Link
      href={"/products/" + product.id}
      className={cls(
        "relative block h-72 w-full overflow-hidden rounded bg-white text-white shadow-lg transition duration-300 hover:scale-[1.02] hover:shadow-xl",
        className,
      )}
    >
      {product.images.length > 0 && (
        <Image
          className="absolute h-full w-full object-contain p-2"
          src={product.images[0]}
          alt={product.name}
          width={400}
          height={400}
        />
      )}

      <div
        className={
          "relative flex h-full flex-col justify-end bg-gradient-to-t from-surface-600 via-[#00000010] via-40% to-60% pb-2"
        }
      >
        <div className="typography-h6 px-6">{product.name}</div>
        <div className="flex gap-4 px-6">
          {product.price && (
            <span className="mb-2 mr-2 flex items-center gap-2 py-1 text-sm font-semibold text-white">
              {getCurrencySymbol(product.currency)}
              {product.price}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductPreviewCard;
