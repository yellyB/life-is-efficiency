import rehypePrism from 'rehype-prism-plus';
import rehypeRaw from 'rehype-raw';
import rehypeStringify from 'rehype-stringify';
import remarkCjkFriendly from 'remark-cjk-friendly';
import remarkCjkFriendlyGfmStrikethrough from 'remark-cjk-friendly-gfm-strikethrough';
import remarkGfm from 'remark-gfm';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';

const processor = unified()
	.use(remarkParse)
	.use(remarkGfm, { singleTilde: false })
	.use(remarkCjkFriendly)
	.use(remarkCjkFriendlyGfmStrikethrough, { singleTilde: false })
	.use(remarkRehype, { allowDangerousHtml: true })
	.use(rehypeRaw)
	.use(rehypePrism, { ignoreMissing: true })
	.use(rehypeStringify);

export async function renderMarkdown(path: string, markdown: string) {
	return String(await processor.process({ path, value: markdown }));
}
