import { error } from '@sveltejs/kit';
import { renderPost } from '$lib/server/posts.js';

export async function load({ params }) {
	const post = await renderPost(params.category, params.slug);
	if (!post) throw error(404, `Could not find ${params.category ?? ''}/${params.slug}`);

	return post;
}
