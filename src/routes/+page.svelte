<script lang="ts">
	import 'prismjs/themes/prism.css';
	import { categories, categoryLabels, postHref, type Category, type PostMeta } from '$lib/content.js';

	let { data } = $props();
	const posts: PostMeta[] = data.posts;

	let filter = $state<Category | null | 'all'>('all');

	const filtered = $derived(filter === 'all' ? posts : posts.filter((p) => p.category === filter));
</script>

<section>
	<h1>Today I Learned</h1>

	<nav>
		<button class:active={filter === 'all'} onclick={() => (filter = 'all')}>전체</button>
		{#each categories as category}
			<button class:active={filter === category} onclick={() => (filter = category)}>
				{categoryLabels[category]}
			</button>
		{/each}
		<button class:active={filter === null} onclick={() => (filter = null)}>카테고리 없음</button>
	</nav>

	<ul>
		{#each filtered as post}
			<li>
				{#if filter === 'all' && post.category}<span class="tag">[{categoryLabels[post.category]}]</span>{/if}
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
