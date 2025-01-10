"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";

import { BlogEntryWithId } from "@/app/common/types";

interface BlogEntryPreviewCardProps {
  blogEntry: BlogEntryWithId;
}

const BlogEntryPreviewCard: React.FC<BlogEntryPreviewCardProps> = ({
  blogEntry,
}) => {
  return (
    <Link
      href={"/blog/" + blogEntry.id}
      className="relative block h-72 w-full overflow-hidden rounded bg-surface-700 text-white shadow-lg transition duration-300 hover:scale-[1.02] hover:shadow-xl"
    >
      {blogEntry.header_image && (
        <Image
          className="absolute h-full w-full object-cover"
          src={blogEntry.header_image}
          alt={blogEntry.name}
          width={500}
          height={500}
        />
      )}

      <div
        className={
          "relative flex h-full flex-col justify-end bg-gradient-to-t from-black via-[#00000010] via-40% to-60% pb-2"
        }
      >
        <div className="typography-h5 px-6 py-4">{blogEntry.name}</div>
      </div>
    </Link>
  );
};

export default BlogEntryPreviewCard;
