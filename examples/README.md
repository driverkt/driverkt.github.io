# Examples

One annotated example of each kind of content. Astro does not build this
folder: copy a file into the matching folder under `src/content/`, rename
it, and edit.

| Example | Copy to |
|---|---|
| `essays/example.md` | `src/content/essays/your-slug.md` |
| `photos/example/` (folder with images) | `src/content/photos/your-slug/` |
| `notes/example.md` | `src/content/notes/2026-11-10.md` (any name) |
| `links/example.md` | `src/content/links/your-slug.md` |
| `videos/example.md` | `src/content/videos/your-slug.md` |

The file name (or folder name, for photos) becomes the URL:
`essays/on-keys.md` is published at `/essays/on-keys/`.

Every post takes `date` and optional `tags` and `draft: true` (drafts show
in `npm run dev` but are left out of the built site).
