"use client";

import { BlogEntryWithId, ProductWithId } from "../types";
import {
  CircularProgress,
  Container,
  Markdown,
  Typography,
  cls,
} from "@firecms/ui";
import Image from "next/image";

import ProductPreviewCard from "@/app/common/components/ProductPreviewCard";

/**
 * This is a sample view used to render the content of a blog entry.
 * It is bound to the data that is modified in the form.
 */
export function BlogEntryView({ blogEntry }: { blogEntry: BlogEntryWithId }) {
  return (
    <div>
      {blogEntry.header_image && (
        <Image
          alt={"Header"}
          style={{
            width: "100%",
            maxHeight: "400px",
            objectFit: "cover",
          }}
          src={blogEntry.header_image}
          width={1000}
          height={400}
        />
      )}

      <Container className={"mb-16"}>
        <Container maxWidth={"5xl"} className={"my-12"}>
          {blogEntry?.name && (
            <Typography variant={"h1"} className="mx-4 mb-8 mt-16 md:mx-12">
              {blogEntry.name}
            </Typography>
          )}
          {blogEntry?.tags && (
            <div className={"mx-4 md:mx-12"}>
              {blogEntry?.tags.map((tag, index) => (
                <span
                  key={`tag_${index}`}
                  className="mr-2 rounded-lg bg-secondary px-3 py-1.5 text-sm text-white"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </Container>

        {blogEntry?.content &&
          blogEntry.content
            .filter((e: any) => !!e)
            .map((entry: any, index: number) => {
              if (entry.type === "text")
                return (
                  <Text
                    key={`preview_text_${index}`}
                    markdownText={entry.value}
                  />
                );
              if (entry.type === "quote")
                return (
                  <Quote
                    key={`preview_text_${index}`}
                    quoteText={entry.value}
                  />
                );
              if (entry.type === "images")
                return (
                  <Images
                    key={`preview_images_${index}`}
                    images={entry.value}
                  />
                );
              if (entry.type === "products")
                return (
                  <ProductGroupPreview
                    key={`preview_products_${index}`}
                    products={entry.value}
                  />
                );
              return (
                <div key={`preview_images_${index}`}>
                  Unexpected value in blog entry
                </div>
              );
            })}
      </Container>
    </div>
  );
}

export function Images({ images }: { images: string[] }) {
  if (!Array.isArray(images)) return <></>;
  return (
    <div className="my-1 flex justify-center sm:my-3 md:my-6">
      {images.map((url, index) => (
        <div key={`images_${index}`} className="h-[350px] w-full">
          <Image
            alt="blog"
            src={url}
            className={"h-full w-full object-cover"}
            width={500}
            height={500}
          />
        </div>
      ))}
    </div>
  );
}

function Text({ markdownText }: { markdownText: string }) {
  if (!markdownText) return <></>;

  return (
    <Container maxWidth={"5xl"}>
      <div className="mx-4 mb-12 mt-12 md:mx-12">
        <Markdown source={markdownText} />
      </div>
    </Container>
  );
}

function ProductGroupPreview({ products }: { products: ProductWithId[] }) {
  if (!products) return <CircularProgress />;

  const manyProducts = products.length > 3;

  return (
    <div
      className={cls(
        "mx-auto flex max-w-5xl items-center gap-4 px-4 md:px-12",
        {
          "flex-wrap": manyProducts,
        },
      )}
    >
      {products.map((p, index) => (
        <ProductPreviewCard
          className={cls("w-full", {
            "flex-grow": !manyProducts,
          })}
          key={`products_${index}`}
          product={p}
        />
      ))}
    </div>
  );
}

function Quote({ quoteText }: { quoteText: string }) {
  if (!quoteText) return <></>;

  return (
    <Container
      maxWidth={"5xl"}
      className={
        "mx-8 my-8 border-l-2 border-l-red-950 italic dark:border-l-red-100"
      }
    >
      <Typography variant="h3">{quoteText}</Typography>
    </Container>
  );
}
