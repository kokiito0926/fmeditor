#!/usr/bin/env node

// >> $ curl -fsSL https://raw.githubusercontent.com/Kernix13/markdown-cheatsheet/refs/heads/master/frontmatter.md | ./index.js get --title --tags --draft
// >> $ curl -fsSL https://raw.githubusercontent.com/Kernix13/markdown-cheatsheet/refs/heads/master/frontmatter.md | ./index.js set --tags '["markdown", "frontmatter", "yaml"]'
// >> $ curl -fsSL https://raw.githubusercontent.com/Kernix13/markdown-cheatsheet/refs/heads/master/frontmatter.md | ./index.js remove --title --tags

import { stdin, argv, YAML } from "zx";
import matter from "gray-matter";

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

	const doc = matter(input);

	doc.data = { ...doc.data, ...processedData };

	const text = matter.stringify(doc.content, doc.data);
	console.log(text);
} else if (command === "get") {
	const doc = matter(input);

	const keys = Object.keys(flags);
	if (keys.length === 0) {
		console.log(YAML.stringify(doc.data));
	} else {
		const result = {};
		keys.forEach((k) => {
			if (k in doc.data) result[k] = doc.data[k];
		});
		console.log(YAML.stringify(result));
	}
} else if (command === "remove") {
	const doc = matter(input);

	Object.keys(flags).forEach((k) => {
		delete doc.data[k];
	});

	const text = matter.stringify(doc.content, doc.data);
	console.log(text);
}
