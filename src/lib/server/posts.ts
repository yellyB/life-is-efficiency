import matter from 'gray-matter';
import { parseContentPath, type PostMeta } from '$lib/content.js';
import { renderMarkdown } from './markdown.js';

const sourcesByPath = import.meta.glob<string>('/content/**/*.md', {
	eager: true,
	query: '?raw',
	import: 'default'
});

type Post = { meta: PostMeta; path: string; body: string };

function asString(value: unknown) {
	if (value instanceof Date) return value.toISOString().slice(0, 10);
	return value == null ? undefined : String(value);
}

const posts: Post[] = Object.entries(sourcesByPath)
	.flatMap(([path, source]) => {
		const parsed = parseContentPath(path);
		if (!parsed) return [];
		const { data, content } = matter(source);
		const date = asString(data.date);
		if (!date) throw new Error(`frontmatter에 date가 누락된 문서: ${path.slice(1)}`);

		const meta: PostMeta = {
			title: asString(data.title) ?? parsed.name,
			date,
			category: parsed.category,
			slug: parsed.slug
		};
		return [{ meta, path, body: content }];
	})
	.sort((a, b) => b.meta.date.localeCompare(a.meta.date));

const postMetas = posts.map((post) => post.meta);

export function getPostMetas() {
	return postMetas;
}

export async function renderPost(category: string | undefined, slug: string) {
	const post = posts.find(({ meta }) => meta.category === (category ?? null) && meta.slug === slug);
	if (!post) return null;

	return { meta: post.meta, html: await renderMarkdown(post.path, post.body) };
}
