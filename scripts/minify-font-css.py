#!/usr/bin/env python3
"""Minify a MonoLisa inline-CSS webfont file, keeping its licence header.

Usage: python3 scripts/minify-font-css.py input.css output.css
The base64 font data is left untouched; only whitespace and comments go.
"""
import re, sys
src = open(sys.argv[1]).read()
legal = re.match(r"\s*(/\*!.*?\*/)", src, re.S)
body = src[legal.end():] if legal else src
body = re.sub(r"/\*.*?\*/", "", body, flags=re.S)       # other comments
body = re.sub(r"\s+", " ", body)                        # collapse whitespace
body = re.sub(r"\s*([{};:,])\s*", r"\1", body)          # around punctuation
body = body.replace(";}", "}").strip()
open(sys.argv[2], "w").write((legal.group(1) + "\n" if legal else "") + body + "\n")
