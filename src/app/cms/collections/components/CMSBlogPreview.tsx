import { Button, CircularProgress, OpenInNewIcon } from "@firecms/ui";
import Link from "next/link";
import React, { useEffect } from "react";

import { BlogEntryView } from "@/app/common/components/BlogEntryView";
import { convertBlogEntry } from "@/app/common/database";
import { BlogEntry, BlogEntryWithId } from "@/app/common/types";

export function CMSBlogPreview({
  blogEntry,
  id,
}: {
  blogEntry?: BlogEntry;
  id: string;
}) {
  const [convertedBlogEntry, setConvertedBlogEntry] =
    React.useState<BlogEntryWithId | null>(null);
  useEffect(() => {
    if (blogEntry) convertBlogEntry(blogEntry, id).then(setConvertedBlogEntry);
  }, [blogEntry, id]);

  if (!convertedBlogEntry) {
    return <CircularProgress />;
  }

  return (
    <div className={"relative"}>
      <div className={"absolute right-4 top-4 flex w-full justify-end p-4"}>
        <Link href={"/blog/" + id} target={"_blank"}>
          <Button variant={"text"} color="text" size={"small"}>
            <OpenInNewIcon /> See blog entry in website
          </Button>
        </Link>
      </div>
      <BlogEntryView blogEntry={convertedBlogEntry} />
    </div>
  );
}
