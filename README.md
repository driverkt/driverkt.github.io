# Notebook

[driverkt](https://github.com/driverkt)'s site: an Astro 7 static blog, typeset after
[The Elements of Typographic Style Applied to the Web](https://webtypography.net/).
`AGENTS.md` explains how it's built and why; this file is how to use it.

```sh
npm install
npm run dev      # http://localhost:4321
npm run build    # static site in dist/
npm run check    # build, then lint the CSS and validate the HTML
```

## Your words

All wording is outside the templates:

| What | File |
|---|---|
| Home-page bio | `src/text/intro.md` |
| About page | `src/pages/about.md` |
| Name, role, links, nav | `src/config.ts` |

## Writing content

Every post type is a folder in `src/content/`. Front matter is checked at
build time, so a missing or mistyped field stops the build with a message.

| Type | Folder | Required front matter |
|---|---|---|
| Essay | `essays/*.md` | `title`, `description`, `date` |
| Photos | `photos/<slug>/index.md` + images | `date`, `photos` (1–6, each `src` and `alt`); optional `title`; the body is the caption |
| Note | `notes/*.md` | `date` |
| Link | `links/*.md` | `title`, `url`, `date` |
| Video | `videos/*.md` | `title`, `youtube` (the 11-character id), `date` |

All types take optional `tags` and `draft: true`. Everything is merged
into one stream (`src/lib/stream.ts`) for the home page, `/posts/` and
the tag pages.

Maths: `$inline$` and `$$display$$` become native MathML at build time.
Typesetting (`src/lib/rehype-typeset.mjs`) adds hard spaces and `<abbr>`
around acronyms at build time; wrap anything to leave alone in
`class="notypeset"`.

## CV

There's no web CV for now. The CV link in the menu points at `#`; set it
in `src/config.ts` to a résumé PDF when there is one (a file in `public/`,
say `public/resume.pdf`, is served at `/resume.pdf`). A matching home-page
link is commented out in `src/pages/index.astro`, ready to restore.

`resume/` keeps the career data (positions, education, publications) for
that résumé. It isn't part of the site build.

## Fonts

MonoLisa Text and MonoLisa Code, from MonoLisa's "inline CSS" webfont
downloads, live in `public/fonts/` as `monolisa-text.css` and
`monolisa-code.css`. To update them, download new inline CSS files and run:

```sh
python3 scripts/minify-font-css.py monolisatext-webfont.css public/fonts/monolisa-text.css
python3 scripts/minify-font-css.py monolisacode-webfont.css public/fonts/monolisa-code.css
```

## Look

- **Colours:** `src/styles/palettes/`. Change the `@import` at the top of
  `src/styles/site.css` to switch palette.
- **Type:** `src/styles/fonts.css` (letter variants, fallbacks, grade).
- **Typography rules** (measure, rhythm, scale): `src/styles/typeset.css`.

## Deploying to GitHub Pages

`.github/workflows/deploy.yml` builds the site and publishes it on every
push to `main` (or from the Actions tab → Deploy → Run workflow).

One-time setup, in the `driverkt.github.io` repository on GitHub:
Settings → Pages → Build and deployment → Source: **GitHub Actions**.

Day to day: edit, check with `npm run dev` (and `npm run check` before
larger changes), then commit and push. The Actions tab shows each deploy;
a red ✗ means the build failed (usually front matter), and the live site
stays as it was.

### Custom domain

1. Set `site` in `astro.config.mjs` to the new address.
2. Add `public/CNAME` containing just the domain (e.g. `blog.example.org`).
3. At your DNS provider, add a `CNAME` record from that name to
   `driverkt.github.io`.
4. In Settings → Pages, enter the domain and tick “Enforce HTTPS” once
   the certificate is ready.
