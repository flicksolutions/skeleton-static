<script>
	import { createWsrvSrcSet } from '$lib/functions.js';
	import config from '$lib/config.json';
	import { getContext } from 'svelte';

	export let src;
	export let alt;

	const dimensions = getContext(src);
	const { width, height } = dimensions;

	let params = {};
	if (src.includes('#')) params = createOptionObject(src);

	if (params.hasOwnProperty('wsrv')) {
	}

	function createOptionObject(string) {
		const optionObject = {};
		const parts = string.split('#')[1].split('&');

		for (let part of parts) {
			const [key, value] = part.split('=');

			if (key.includes('.')) {
				const nestedKeys = key.split('.');
				let nestedObj = optionObject;

				for (let i = 0; i < nestedKeys.length - 1; i++) {
					const nestedKey = nestedKeys[i];

					if (!nestedObj.hasOwnProperty(nestedKey)) {
						nestedObj[nestedKey] = {};
					}

					nestedObj = nestedObj[nestedKey];
				}

				nestedObj[nestedKeys[nestedKeys.length - 1]] = value;
			} else {
				optionObject[key] = value;
			}
		}

		return optionObject;
	}
</script>

<a href={src} target="_self" class="lightbox" data-sveltekit-preload-data="off">
	<img
		srcset={createWsrvSrcSet(src, [300, 600, 900, 1500, 2100, 3000], params?.wsrv)}
		sizes="(min-width: {config.breakpoints.lg}px) {params?.size ?? '33vw'}, 96vw"
		{src}
		{alt}
		loading="lazy"
		width="{width}px"
		height="{height}px"
	/>
</a>
