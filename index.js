#!/usr/bin/env node

// >> $ curl -fsSL https://raw.githubusercontent.com/Kernix13/markdown-cheatsheet/refs/heads/master/frontmatter.md | ./index.js --draft true
// >> $ curl -fsSL https://raw.githubusercontent.com/Kernix13/markdown-cheatsheet/refs/heads/master/frontmatter.md | ./index.js --tags '["markdown", "frontmatter", "yaml"]'

import { stdin, argv } from "zx";
import matter from "gray-matter";
import yaml from "js-yaml";

if (process.stdin.isTTY) {
	process.exit(1);
}

const input = await stdin();
if (!input) {
	process.exit(1);
}

const { _, ...flags } = argv;
const command = _[0] || "set";

if (command === "set") {
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
} else if (command === "get") {
	const doc = matter(input || "");

	const keys = Object.keys(flags);
	if (keys.length === 0) {
		console.log(yaml.dump(doc.data));
	} else {
		const result = {};
		keys.forEach((k) => {
			if (k in doc.data) result[k] = doc.data[k];
		});
		console.log(yaml.dump(result));
	}
} else if (command === "remove") {
	const doc = matter(input || "");

	Object.keys(flags).forEach((k) => {
		delete doc.data[k];
	});

	const text = matter.stringify(doc.content, doc.data);
	console.log(text);
}
