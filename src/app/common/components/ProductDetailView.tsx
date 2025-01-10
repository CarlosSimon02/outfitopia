"use client";

import { Product } from "../types";
import { useSnackbarController } from "@firecms/core";
import {
  AddIcon,
  Button,
  CenteredView,
  Label,
  Markdown,
  RadioGroup,
  RadioGroupItem,
  Select,
  SelectItem,
} from "@firecms/ui";
import Image from "next/image";
import React from "react";

import { getCurrencySymbol } from "@/app/common/utils";

export function ProductDetailView({ product }: { product?: Product }) {
  const snackbarController = useSnackbarController();

  const [selectedImage, setSelectedImage] = React.useState<string | undefined>(
    product?.images?.[0],
  );
  const [quantity, setQuantity] = React.useState(1);

  if (!product) {
    return <CenteredView>Please add some data to see the preview</CenteredView>;
  }

  return (
    <CenteredView>
      <div className="mx-auto my-8 grid max-w-6xl items-start gap-6 px-4 py-6 md:grid-cols-2 lg:gap-12">
        <div className="grid items-start gap-3 md:grid-cols-5">
          <div className="hidden flex-col items-start gap-3 md:flex">
            {product.images?.map((image, index) => (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setSelectedImage(image);
                }}
                key={`image_${index}`}
              >
                <Image
                  src={image}
                  alt="product"
                  className="aspect-[5/6] rounded bg-white object-contain"
                  style={{
                    height: 120,
                    width: 100,
                  }}
                  width={100}
                  height={120}
                />
              </button>
            ))}
          </div>
          <div className="md:col-span-4">
            {selectedImage && (
              <Image
                alt="Product"
                style={{
                  height: 600,
                  width: 900,
                }}
                width={900}
                height={600}
                className="aspect-[2/3] w-full overflow-hidden rounded-lg bg-white object-contain"
                src={selectedImage}
              />
            )}
          </div>
        </div>
        <div className="grid h-full content-center items-start gap-4 md:gap-10">
          <div className="grid gap-4">
            <div className="flex items-start">
              <h1 className="flex-grow font-headers text-3xl lg:text-4xl">
                {product.name ?? "Product name"}{" "}
              </h1>
              <div className="ml-auto font-headers text-4xl font-medium">
                {getCurrencySymbol(product.currency)}
                {product.price}
              </div>
            </div>
            <Markdown source={product.description} />
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-0.5">
                <StarIcon className="fill-primary-500 stroke-primary-500 h-5 w-5" />
                <StarIcon className="fill-primary-500 stroke-primary-500 h-5 w-5" />
                <StarIcon className="fill-primary-500 stroke-primary-500 h-5 w-5" />
                <StarIcon className="fill-primary-500 stroke-primary-500 h-5 w-5" />
                <StarIcon className="fill-primary-100 dark:fill-primary-900 stroke-primary-400 dark:stroke-primary-600 h-5 w-5" />
              </div>
            </div>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label className="text-base" htmlFor="color">
                Color
              </Label>
              <RadioGroup
                className="flex items-center gap-2"
                defaultValue="black"
                id="color"
              >
                <Label
                  className="flex cursor-pointer items-center gap-2 rounded-md border p-2 [&:has(:checked)]:bg-surface-accent-100 dark:[&:has(:checked)]:bg-surface-800"
                  htmlFor="color-black"
                >
                  <RadioGroupItem id="color-black" value="black" />
                  Black
                </Label>
                <Label
                  className="flex cursor-pointer items-center gap-2 rounded-md border p-2 [&:has(:checked)]:bg-surface-accent-100 dark:[&:has(:checked)]:bg-surface-800"
                  htmlFor="color-white"
                >
                  <RadioGroupItem id="color-white" value="white" />
                  White
                </Label>
                <Label
                  className="flex cursor-pointer items-center gap-2 rounded-md border p-2 [&:has(:checked)]:bg-surface-accent-100 dark:[&:has(:checked)]:bg-surface-800"
                  htmlFor="color-blue"
                >
                  <RadioGroupItem id="color-blue" value="blue" />
                  Blue
                </Label>
              </RadioGroup>
            </div>
            <div className="grid gap-2">
              <Label className="text-base" htmlFor="size">
                Size
              </Label>
              <RadioGroup
                className="flex items-center gap-2"
                defaultValue="m"
                id="size"
              >
                <Label
                  className="flex cursor-pointer items-center gap-2 rounded-md border p-2 [&:has(:checked)]:bg-surface-accent-100 dark:[&:has(:checked)]:bg-surface-800"
                  htmlFor="size-xs"
                >
                  <RadioGroupItem id="size-xs" value="xs" />
                  XS
                </Label>
                <Label
                  className="flex cursor-pointer items-center gap-2 rounded-md border p-2 [&:has(:checked)]:bg-surface-accent-100 dark:[&:has(:checked)]:bg-surface-800"
                  htmlFor="size-s"
                >
                  <RadioGroupItem id="size-s" value="s" />S
                  {"\n                          "}
                </Label>
                <Label
                  className="flex cursor-pointer items-center gap-2 rounded-md border p-2 [&:has(:checked)]:bg-surface-accent-100 dark:[&:has(:checked)]:bg-surface-800"
                  htmlFor="size-m"
                >
                  <RadioGroupItem id="size-m" value="m" />M
                  {"\n                          "}
                </Label>
                <Label
                  className="flex cursor-pointer items-center gap-2 rounded-md border p-2 [&:has(:checked)]:bg-surface-accent-100 dark:[&:has(:checked)]:bg-surface-800"
                  htmlFor="size-l"
                >
                  <RadioGroupItem id="size-l" value="l" />L
                  {"\n                          "}
                </Label>
                <Label
                  className="flex cursor-pointer items-center gap-2 rounded-md border p-2 [&:has(:checked)]:bg-surface-accent-100 dark:[&:has(:checked)]:bg-surface-800"
                  htmlFor="size-xl"
                >
                  <RadioGroupItem id="size-xl" value="xl" />
                  XL
                </Label>
              </RadioGroup>
            </div>
            <div className="grid gap-2">
              <Label className="text-base" htmlFor="quantity">
                Quantity
              </Label>
              <Select
                size={"medium"}
                fullWidth
                value={String(quantity)}
                onValueChange={(value) => setQuantity(Number(value))}
              >
                <SelectItem value="1">1</SelectItem>
                <SelectItem value="2">2</SelectItem>
                <SelectItem value="3">3</SelectItem>
                <SelectItem value="4">4</SelectItem>
                <SelectItem value="5">5</SelectItem>
              </Select>
            </div>
            <Button
              size="large"
              fullWidth
              onClick={() =>
                snackbarController.open({
                  type: "success",
                  message: `DEMO: Added ${quantity} ${product.name} to cart`,
                })
              }
            >
              <AddIcon />
              Add to cart
            </Button>
          </div>
        </div>
      </div>
    </CenteredView>
  );
}

function StarIcon(props: { className: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      // stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}
