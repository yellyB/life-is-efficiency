import matter from 'gray-matter';
import gitDates from 'virtual:content-dates';
import { parseContentPath, type Post } from '$lib/content.js';
import { renderMarkdown } from './markdown.js';

const sourcesByPath = import.meta.glob<string>('/content/**/*.md', {
	eager: true,
	query: '?raw',
	import: 'default'
});

const today = new Date().toISOString().slice(0, 10);

type Entry = { post: Post; path: string; body: string };

function asString(value: unknown) {
	if (value instanceof Date) return value.toISOString().slice(0, 10);
	return value == null ? undefined : String(value);
}

const entries: Entry[] = Object.entries(sourcesByPath)
	.flatMap(([path, source]) => {
		const parsed = parseContentPath(path);
		if (!parsed) return [];
		const { data, content } = matter(source);

		const post: Post = {
			title: asString(data.title) ?? parsed.name,
			date: asString(data.date) ?? gitDates[path] ?? today,
			category: parsed.category,
			slug: parsed.slug
		};
		return [{ post, path, body: content }];
	})
	.sort((a, b) => b.post.date.localeCompare(a.post.date));

const posts = entries.map((entry) => entry.post);

export function getPosts() {
	return posts;
}

export async function renderPost(category: string | undefined, slug: string) {
	const entry = entries.find(
		({ post }) => post.category === (category ?? null) && post.slug === slug
	);
	if (!entry) return null;

	return { meta: entry.post, html: await renderMarkdown(entry.path, entry.body) };
}
