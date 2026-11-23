import { posix } from 'node:path';
import type { Element, Root, RootContent } from 'hast';
import rehypePrism from 'rehype-prism-plus';
import rehypeRaw from 'rehype-raw';
import rehypeStringify from 'rehype-stringify';
import remarkCjkFriendly from 'remark-cjk-friendly';
import remarkCjkFriendlyGfmStrikethrough from 'remark-cjk-friendly-gfm-strikethrough';
import remarkGfm from 'remark-gfm';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';
import type { VFile } from 'vfile';

const assetUrls = import.meta.glob<string>('/content/**/*.{png,jpg,gif,svg,pdf}', {
	eager: true,
	query: '?url',
	import: 'default'
});

const RELATIVE_URL = /^\.\//;
const URL_ATTRIBUTES: Record<string, string> = { img: 'src', a: 'href' };

function walk(node: Root | RootContent, visit: (element: Element) => void) {
	if (node.type === 'element') visit(node);
	if ('children' in node) for (const child of node.children) walk(child, visit);
}

function resolveRelativeAssets() {
	return (tree: Root, file: VFile) => {
		const dir = posix.dirname(file.path);

		walk(tree, (element) => {
			const attribute = URL_ATTRIBUTES[element.tagName];
			const url = attribute && element.properties[attribute];
			if (typeof url !== 'string' || !RELATIVE_URL.test(url)) return;

			const path = posix.join(dir, url.split('/').map(decodeURIComponent).join('/'));
			if (assetUrls[path]) element.properties[attribute] = assetUrls[path];
		});
	};
}

const processor = unified()
	.use(remarkParse)
	.use(remarkGfm, { singleTilde: false })
	.use(remarkCjkFriendly)
	.use(remarkCjkFriendlyGfmStrikethrough, { singleTilde: false })
	.use(remarkRehype, { allowDangerousHtml: true })
	.use(rehypeRaw)
	.use(resolveRelativeAssets)
	.use(rehypePrism, { ignoreMissing: true })
	.use(rehypeStringify);

export async function renderMarkdown(path: string, markdown: string) {
	return String(await processor.process({ path, value: markdown }));
}
