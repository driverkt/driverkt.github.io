import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { site } from "../config";
import { getStream, permalink, titleOf } from "../lib/stream";

export async function GET(context: APIContext) {
  const stream = await getStream();
  return rss({
    title: site.title,
    description: site.description,
    site: context.site!,
    items: stream.map((item) => ({
      title: titleOf(item),
      pubDate: item.entry.data.date,
      link: permalink(item),
      description: "description" in item.entry.data ? item.entry.data.description : undefined,
      categories: item.entry.data.tags,
    })),
  });
}
