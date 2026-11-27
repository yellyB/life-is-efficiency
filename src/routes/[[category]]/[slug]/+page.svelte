<script lang="ts">
	export let data;
	console.log(data);
</script>

<svelte:head>
	<title>{data.meta.title}</title>
	<meta property="og:type" content="article" />
	<meta property="og:title" content={data.meta.title} />
</svelte:head>

<article>
	<div>
		<h1>{data.meta.title}</h1>
		<p>최근 수정일 {data.meta.updated}</p>
	</div>

	<div>
		{@html data.html}
	</div>
</article>
