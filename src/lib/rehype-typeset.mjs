/**
 * typeset — the webtypography.net rules CSS can't do, applied at build time
 * to Markdown content (a port of typeset.js; no client JavaScript).
 *
 * §2.4.6  Hard spaces in short numerical and mathematical expressions.
 * §2.1.5  Little or no space within strings of initials.
 * §2.1.6 / §3.2.2  Wrap runs of capitals in <abbr> for spaced small caps.
 */
import { defineHastPlugin } from "satteri";

const NBSP = " ";
const NNBSP = " ";

const SKIP = new Set(["code", "kbd", "samp", "pre", "script", "style", "textarea", "math", "svg"]);
const NO_ABBR = new Set(["abbr", "a", "h1", "h2", "h3", "h4", "h5", "h6"]);

const rules = [
  // §2.4.6 /([0-9]) ([a-zA-Z])/ → $1&nbsp;$2, widened to any script.
  [/(\d) (\p{L})/gu, `$1${NBSP}$2`],
  // §2.4.6 watch-words: page 3, chapter 5, p. 23, § 4.
  [/(?<!\p{L})(page|chapter|section|figure|table|volume|p\.|pp\.|ch\.|fig\.|vol\.|no\.|§|¶) (?=\d)/giu, `$1${NBSP}`],
  // §2.4.6 Short mathematical expressions: 3 + 4 = 7.
  [/(\S) ([+−×÷=<>≤≥±]) (?=\S)/gu, `$1${NBSP}$2${NBSP}`],
  // §2.1.5 J. R. R. Tolkien.
  [/((?<!\p{L})\p{Lu}\.) (?=\p{Lu}\.)/gu, `$1${NNBSP}`],
  [/((?<!\p{L})\p{Lu}\.) (?=\p{Lu}\p{Ll})/gu, `$1${NBSP}`],
];

// §2.1.6 /\b([A-Z][A-Z0-9]{2,})\b/ → <abbr>$1</abbr>, Unicode-aware.
const ACRONYM = /(?<![\p{L}\p{N}])(\p{Lu}[\p{Lu}\p{N}]{2,})(?![\p{L}\p{N}])/gu;

/** The same spacing rules for strings in templates (titles, descriptions). */
export function typesetText(text = "") {
  return rules.reduce((t, [pattern, replacement]) => t.replace(pattern, replacement), text);
}

const classes = (el) => {
  const c = el.properties?.className;
  return Array.isArray(c) ? c : typeof c === "string" ? c.split(/\s+/) : [];
};

export const typeset = defineHastPlugin({
  name: "typeset",
  text(node, ctx) {
    let noAbbr = false;
    for (let p = ctx.parent(node); p && p.type === "element"; p = ctx.parent(p)) {
      const cls = classes(p);
      if (SKIP.has(p.tagName) || cls.includes("notypeset") || cls.includes("katex")) return;
      if (NO_ABBR.has(p.tagName)) noAbbr = true;
    }
    const text = typesetText(node.value);
    if (noAbbr || !/\p{Ll}/u.test(text) || !ACRONYM.test(text)) {
      ACRONYM.lastIndex = 0;
      if (text !== node.value) return { type: "text", value: text };
      return;
    }
    ACRONYM.lastIndex = 0;
    const parts = text.split(ACRONYM).flatMap((part, i) => {
      if (!part) return [];
      return i % 2
        ? [{ type: "element", tagName: "abbr", properties: {}, children: [{ type: "text", value: part }] }]
        : [{ type: "text", value: part }];
    });
    ctx.replaceNode(node, parts);
  },
});
