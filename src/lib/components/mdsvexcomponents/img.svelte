<script>
	import { createWsrvSrcSet } from '$lib/functions.js';
	import config from '$lib/config.json';

	export let src;
	export let alt;
	let size = src.includes('size=') ? src.split('size=')[1] : '33vw';

	//TODO: Analyze src for sizes to create sizes attribute #fullscreen
</script>

<a href={src} target="_self" class="lightbox" data-sveltekit-preload-data="off">
	<img
		srcset={createWsrvSrcSet(src)}
		sizes="(min-width: {config.breakpoints.lg}px) {size}, 96vw"
		{src}
		{alt}
		loading="lazy"
	/>
</a>
