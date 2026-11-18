/**
 * Code blocks: wraps each highlighted <pre> in a figure-like frame with a
 * header showing the file name (```java title="Hello.java") or, failing
 * that, the language. A copy button is added by a small script in
 * Base.astro.
 */
const LANGUAGES = {
  js: "JavaScript", javascript: "JavaScript", ts: "TypeScript", typescript: "TypeScript",
  py: "Python", python: "Python", java: "Java", go: "Go", rs: "Rust", rust: "Rust",
  html: "HTML", css: "CSS", scss: "SCSS", json: "JSON", yaml: "YAML", yml: "YAML",
  sh: "Shell", bash: "Bash", zsh: "Zsh", shell: "Shell", sql: "SQL", md: "Markdown",
  markdown: "Markdown", astro: "Astro", c: "C", cpp: "C++", swift: "Swift", kotlin: "Kotlin",
  toml: "TOML", xml: "XML", diff: "Diff", plaintext: "Text", text: "Text", txt: "Text",
};

export const codeBlocks = {
  name: "code-blocks",
  root(root) {
    const raw = typeof this.options.meta === "string" ? this.options.meta : this.options.meta?.__raw ?? "";
    const title = raw.match(/title=(?:"([^"]*)"|'([^']*)'|(\S+))/)?.slice(1).find(Boolean);
    const lang = this.options.lang ?? "text";
    const label = title ?? LANGUAGES[lang] ?? lang;
    const pre = root.children[0];
    return {
      type: "root",
      children: [{
        type: "element",
        tagName: "div",
        properties: { className: ["code-block"], dataLang: lang },
        children: [
          {
            type: "element",
            tagName: "div",
            properties: { className: ["code-head"] },
            children: [{
              type: "element",
              tagName: "span",
              properties: title ? { className: ["code-title"] } : {},
              children: [{ type: "text", value: label }],
            }],
          },
          pre,
        ],
      }],
    };
  },
};
