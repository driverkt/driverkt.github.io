---
title: An Example Essay
description: One or two sentences, shown under the title in lists and in search results.
date: 2026-11-10
tags: [example]
# draft: true
---

Ordinary paragraphs. The first after a heading is set flush; later ones are
indented. Acronyms like PKCS and JCE are spaced automatically, and short
expressions such as 3 + 4 = 7 or page 23 never break across lines.

## A heading

Inline code: `KeyStore.getInstance("PKCS12")`. Keys: <kbd>⌘K</kbd>.

A code block, with a file name in its header (leave `title` off to show the
language instead):

```java title="Example.java"
var kdf = KDF.getInstance("HKDF-SHA256");
SecretKey key = kdf.deriveKey("AES", params);
```

Maths, inline $E = mc^2$ or displayed:

$$
\int_0^1 x^2 \, \mathrm{d}x = \frac{1}{3}
$$

> A block quotation.

| Column | Number |
| :-- | --: |
| Lining, tabular figures | 1,024 |
| line up in tables | 65,536 |

Text in another language should say so, for the right fonts and
hyphenation: <span lang="grc">λόγος</span>, <span lang="hbo" dir="rtl">בְּרֵאשִׁית</span>.
