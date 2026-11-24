export const categories = [
	'til',
	'algorithms',
	'javascript',
	'react',
	'web',
	'toy-project',
	'comics',
	'programming',
	'network',
	'dev-env',
	'mssql'
] as const;
export type Category = (typeof categories)[number];

export const categoryLabels: Record<Category, string> = {
	til: 'TIL',
	algorithms: '알고리즘',
	javascript: 'JavaScript',
	react: 'React',
	web: 'WEB',
	'toy-project': '토이프로젝트',
	comics: '짧은만화',
	programming: '프로그래밍',
	network: '네트워크',
	'dev-env': '개발환경',
	mssql: 'MSSQL'
};

export type Post = {
	title: string;
	date: string;
	category: Category | null;
	slug: string;
};

export function postHref(post: Pick<Post, 'category' | 'slug'>) {
	return post.category ? `/${post.category}/${post.slug}` : `/${post.slug}`;
}

function isCategory(value: string): value is Category {
	return (categories as readonly string[]).includes(value);
}

function toSlug(name: string) {
	return name
		.toLowerCase()
		.replace(/[^\p{L}\p{N}]+/gu, '-')
		.replace(/^-+|-+$/g, '');
}

const POST_FOLDER_ENTRY = 'index.md';

function splitContentPath(path: string): { category: Category | null; name: string } | null {
	const parts = path.split('/').slice(2);
	if (!parts.at(-1)?.endsWith('.md')) return null;

	const isFolderPost = parts.at(-1) === POST_FOLDER_ENTRY && parts.length > 1;
	const segments = isFolderPost ? parts.slice(0, -1) : parts;
	const name = isFolderPost ? segments.at(-1)! : segments.at(-1)!.replace(/\.md$/, '');

	if (segments.length === 1) return { category: null, name };
	if (segments.length === 2 && isCategory(segments[0])) return { category: segments[0], name };
	return null;
}

export function parseContentPath(path: string) {
	const split = splitContentPath(path);
	if (!split) return null;

	return { ...split, slug: toSlug(split.name) };
}
