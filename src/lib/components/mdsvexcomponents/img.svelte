<script>
	import { createWsrvSrcSet } from '$lib/functions.js';
	import config from '$lib/config.json';

	export let src;
	export let alt;

	//TODO: Analyze src for sizes to create sizes attribute #fullscreen
</script>

<a href={src} target="_self" class="lightbox" data-sveltekit-preload-data="off">
	<img
		srcset={createWsrvSrcSet(src)}
		sizes="(min-width: {config.breakpoints.lg}) 800px, 96vw"
		{src}
		{alt}
		loading="lazy"
	/>
</a>
