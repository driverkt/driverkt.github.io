// $inline$ and $$display$$ maths → native MathML (Temml), at build time.
import { defineMdastPlugin } from "satteri";
import temml from "temml";

const render = (node, ctx, displayMode) => {
  try {
    return { type: "html", value: temml.renderToString(node.value, { displayMode, throwOnError: false }) };
  } catch (error) {
    ctx.report({ message: `math: ${error instanceof Error ? error.message : error}`, node, severity: "warning" });
  }
};

export const mathml = defineMdastPlugin({
  name: "mathml",
  inlineMath: (node, ctx) => render(node, ctx, false),
  math: (node, ctx) => render(node, ctx, true),
});
