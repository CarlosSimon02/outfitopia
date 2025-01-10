"use client";

import { CircularProgress } from "@firecms/ui";
import { useEffect, useRef, useState } from "react";

import BlogEntryPreviewCard from "@/app/common/components/BlogEntryPreviewCard";
import { getBlogEntries } from "@/app/common/database";
import { BlogEntryWithId } from "@/app/common/types";

export function BlogListView({
  initialEntries,
}: {
  initialEntries: BlogEntryWithId[];
}) {
  const limit = useRef(initialEntries.length);
  const noMoreToLoad = useRef(false);
  const [blogEntries, setBlogEntries] = useState<BlogEntryWithId[]>(
    initialEntries ?? [],
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadBlogEntries = async function loadProducts() {
      const newLimit = blogEntries.length + 10;
      if (newLimit === limit.current || noMoreToLoad.current) {
        return;
      }
      limit.current = newLimit;
      setLoading(true);
      const newBlogEntries = await getBlogEntries({
        limit: newLimit,
      }).finally(() => setLoading(false));

      noMoreToLoad.current = newBlogEntries.length !== newLimit;
      setBlogEntries(newBlogEntries);
    };

    const handleScroll = async () => {
      if (
        window.innerHeight + document.documentElement.scrollTop + 500 >=
        document.documentElement.offsetHeight
      ) {
        await loadBlogEntries();
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [loadBlogEntries]);

  return (
    <div className={"w-full"}>
      <div className={"mx-auto my-8 max-w-5xl p-4"}>
        <h1 className="typography-h4 mb-8">Blog</h1>

        <div className="grid grid-cols-1 gap-x-4 gap-y-6">
          {blogEntries.map((entry) => (
            <BlogEntryPreviewCard key={entry.id} blogEntry={entry} />
          ))}
        </div>

        {loading && (
          <div className="my-32 min-h-full text-center">
            <CircularProgress size={"large"} />
          </div>
        )}
      </div>
    </div>
  );
}
