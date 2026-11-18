import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

/* ----------------------------------------------------------------------------
   Post types. Each lives in its own folder with its own required fields, and
   src/lib/stream.ts merges them into one date-sorted stream.
   -------------------------------------------------------------------------- */

const common = {
  date: z.coerce.date(),
  tags: z.array(z.string()).default([]),
  draft: z.boolean().default(false),
};

const essays = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/essays" }),
  schema: z.object({
    title: z.string(),
    description: z.string().max(200),
    ...common,
  }),
});

const photos = defineCollection({
  loader: glob({ pattern: "**/index.md", base: "./src/content/photos", generateId: ({ entry }) => entry.replace(/\/index\.md$/, "") }),
  // 1–6 photos; the Markdown body is the caption.
  schema: ({ image }) =>
    z.object({
      title: z.string().optional(),
      ...common,
      photos: z.array(z.object({ src: image(), alt: z.string() })).min(1).max(6),
    }),
});

const notes = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/notes" }),
  schema: z.object({ ...common }),
});

const links = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/links" }),
  schema: z.object({
    title: z.string(),
    url: z.url(),
    ...common,
  }),
});

const videos = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/videos" }),
  schema: z.object({
    title: z.string(),
    youtube: z.string().regex(/^[\w-]{11}$/, "An 11-character YouTube video id"),
    caption: z.string().optional(),
    ...common,
  }),
});

export const collections = { essays, photos, notes, links, videos };
