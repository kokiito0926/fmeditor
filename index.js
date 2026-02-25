#!/usr/bin/env node

// >> $ curl -fsSL https://raw.githubusercontent.com/Kernix13/markdown-cheatsheet/refs/heads/master/frontmatter.md | ./index.js --draft true
// >> $ curl -fsSL https://raw.githubusercontent.com/Kernix13/markdown-cheatsheet/refs/heads/master/frontmatter.md | ./index.js --tags '["markdown", "frontmatter", "yaml"]'

import { stdin, argv } from "zx";
import matter from "gray-matter";

if (process.stdin.isTTY) {
	process.exit(1);
}

const input = await stdin();
if (!input) {
	process.exit(1);
}

const { _, ...flags } = argv;

const processedData = {};
for (const [key, value] of Object.entries(flags)) {
	try {
		processedData[key] = JSON.parse(value);
	} catch (err) {
		processedData[key] = value;
	}
}

const doc = matter(input || "");

doc.data = { ...doc.data, ...processedData };

const text = matter.stringify(doc.content, doc.data);
console.log(text);
