<script lang="ts">
	import 'prismjs/themes/prism.css';
	import { categoryLabel, postHref, sortCategories, type PostMeta } from '$lib/content.js';

	let { data } = $props();
	const posts: PostMeta[] = data.posts;
	const categories = sortCategories([
		...new Set(posts.flatMap((post) => (post.category ? [post.category] : [])))
	]);

	let filter = $state<string | null>('all');

	const filtered = $derived(filter === 'all' ? posts : posts.filter((p) => p.category === filter));
</script>

<section>
	<h1>인생은 효율성</h1>

	<nav>
		<button class:active={filter === 'all'} onclick={() => (filter = 'all')}>전체</button>
		{#each categories as category}
			<button class:active={filter === category} onclick={() => (filter = category)}>
				{categoryLabel(category)}
			</button>
		{/each}
		<button class:active={filter === null} onclick={() => (filter = null)}>카테고리 없음</button>
	</nav>

	<ul>
		{#each filtered as post}
			<li>
				{#if filter === 'all' && post.category}<span class="tag">[{categoryLabel(post.category)}]</span>{/if}
				<a href={postHref(post)}>{post.title}</a>
				<span class="date">{post.date}</span>
			</li>
		{/each}
	</ul>
</section>

<style>
	nav {
		display: flex;
		gap: 8px;
		margin: 12px 0;
	}
	button.active {
		font-weight: bold;
	}
	.tag {
		color: #888;
	}
	.date {
		color: #888;
		margin-left: 8px;
	}
</style>
