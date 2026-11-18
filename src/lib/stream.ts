import { getCollection, type CollectionEntry } from "astro:content";
import { formatDate } from "./format";

export type PostType = "essays" | "photos" | "notes" | "links" | "videos";

export type StreamEntry =
  | { type: "essays"; entry: CollectionEntry<"essays"> }
  | { type: "photos"; entry: CollectionEntry<"photos"> }
  | { type: "notes"; entry: CollectionEntry<"notes"> }
  | { type: "links"; entry: CollectionEntry<"links"> }
  | { type: "videos"; entry: CollectionEntry<"videos"> };

export const typeLabel: Record<PostType, string> = {
  essays: "Essay",
  photos: "Photo",
  notes: "Note",
  links: "Link",
  videos: "Video",
};

const visible = ({ data }: { data: { draft: boolean } }) => import.meta.env.DEV || !data.draft;

/** Every post of every type, newest first. */
export async function getStream(): Promise<StreamEntry[]> {
  const [essays, photos, notes, links, videos] = await Promise.all([
    getCollection("essays", visible),
    getCollection("photos", visible),
    getCollection("notes", visible),
    getCollection("links", visible),
    getCollection("videos", visible),
  ]);
  const all: StreamEntry[] = [
    ...essays.map((entry) => ({ type: "essays" as const, entry })),
    ...photos.map((entry) => ({ type: "photos" as const, entry })),
    ...notes.map((entry) => ({ type: "notes" as const, entry })),
    ...links.map((entry) => ({ type: "links" as const, entry })),
    ...videos.map((entry) => ({ type: "videos" as const, entry })),
  ];
  return all.sort((a, b) => b.entry.data.date.valueOf() - a.entry.data.date.valueOf());
}

export const permalink = ({ type, entry }: StreamEntry) => `/${type}/${entry.id}/`;

/** The post's title, or e.g. "Note, 4 Nov 2026" for posts without one. */
export const titleOf = (item: StreamEntry) =>
  ("title" in item.entry.data && item.entry.data.title) || `${typeLabel[item.type]}, ${formatDate(item.entry.data.date)}`;

export const hasTitle = (item: StreamEntry) => "title" in item.entry.data && Boolean(item.entry.data.title);

/** Every tag in use, with counts, alphabetical. */
export async function getTags() {
  const counts = new Map<string, number>();
  for (const { entry } of await getStream()) {
    for (const tag of entry.data.tags) counts.set(tag, (counts.get(tag) ?? 0) + 1);
  }
  return [...counts].sort(([a], [b]) => a.localeCompare(b));
}

export const byDate = <T extends { data: { date: Date } }>(a: T, b: T) => b.data.date.valueOf() - a.data.date.valueOf();
