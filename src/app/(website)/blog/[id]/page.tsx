import { BlogEntryView } from "@/app/common/components/BlogEntryView";
import { getBlogEntry } from "@/app/common/database";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const data = await getBlogEntry(id);
  if (!data) {
    return <div>Blog entry not found</div>;
  }
  return <BlogEntryView blogEntry={data} />;
}
