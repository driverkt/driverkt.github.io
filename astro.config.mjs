// @ts-check
import { defineConfig } from "astro/config";
import { satteri } from "@astrojs/markdown-satteri";
import { mathml } from "./src/lib/math.mjs";
import { typeset } from "./src/lib/rehype-typeset.mjs";
import { codeBlocks } from "./src/lib/code-blocks.mjs";
import tokyoNightStorm from "./src/themes/tokyo-night-storm.json" with { type: "json" };

export default defineConfig({
  // Your final address. While the domain is undecided this is a placeholder;
  // it is used for RSS and canonical URLs. If the site ever lives at
  // username.github.io/repo-name instead, also set `base: "/repo-name"`.
  site: "https://driverkt.github.io", // change to your own domain when it’s set up
  trailingSlash: "always",
  // The site's CSS is about 4 KB compressed: inline it in each page rather
  // than making the first paint wait for a separate request.
  build: { inlineStylesheets: "always" },
  markdown: {
    shikiConfig: {
      // Tokyo Night Storm (MIT, enkia/tokyo-night-vscode-theme), in light
      // and dark mode alike: code blocks are always dark panels.
      theme: tokyoNightStorm,
      transformers: [codeBlocks],
    },
    processor: satteri({
      features: { math: true },
      // $…$ and $$…$$ become native MathML: no maths CSS or fonts to ship.
      mdastPlugins: [mathml],
      // webtypography.net §2.4.6, §2.1.5, §3.2.2 at build time.
      hastPlugins: [typeset],
    }),
  },
});
