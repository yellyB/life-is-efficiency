import { getPostMetas } from '$lib/server/posts.js';

export function load() {
	return { posts: getPostMetas() };
}
