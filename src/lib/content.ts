const categoryLabels: Record<string, string> = {
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
const labeledCategories = Object.keys(categoryLabels);

export function categoryLabel(category: string) {
	return categoryLabels[category] ?? category;
}

export function sortCategories(categories: string[]) {
	const rank = (category: string) => {
		const index = labeledCategories.indexOf(category);
		return index === -1 ? labeledCategories.length : index;
	};
	return [...categories].sort((a, b) => rank(a) - rank(b) || a.localeCompare(b));
}

export type PostMeta = {
	title: string;
	created: string;
	updated: string;
	category: string | null;
	slug: string;
};

export function postHref(post: Pick<PostMeta, 'category' | 'slug'>) {
	return post.category ? `/${post.category}/${post.slug}` : `/${post.slug}`;
}

function toSlug(name: string) {
	return name
		.toLowerCase()
		.replace(/[^\p{L}\p{N}]+/gu, '-')
		.replace(/^-+|-+$/g, '');
}

const POST_FOLDER_ENTRY = 'index.md';

function splitContentPath(path: string): { category: string | null; name: string } | null {
	const parts = path.split('/').slice(2);
	if (!parts.at(-1)?.endsWith('.md')) return null;

	const isFolderPost = parts.at(-1) === POST_FOLDER_ENTRY && parts.length > 1;
	const segments = isFolderPost ? parts.slice(0, -1) : parts;
	const name = isFolderPost ? segments.at(-1)! : segments.at(-1)!.replace(/\.md$/, '');

	if (segments.length === 1) return { category: null, name };
	if (segments.length === 2) return { category: segments[0], name };
	return null;
}

export function parseContentPath(path: string) {
	const split = splitContentPath(path);
	if (!split) return null;

	return { ...split, slug: toSlug(split.name) };
}
