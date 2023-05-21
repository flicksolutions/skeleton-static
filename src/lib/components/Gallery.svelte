<script>
	import { onMount } from 'svelte';
	import { createWsrvSrc } from '$lib/functions';
	import BiggerPicture from 'bigger-picture/svelte';

	let bp;
	let carouselContainer;
	export let srcs = [];
	export let alts = [];

	onMount(() => {
		bp = BiggerPicture({
			target: carouselContainer
		});
		const items = srcs.map((src) => ({
			thumb: createWsrvSrc(src, { h: 300, w: 534, fit: 'contain' }), // since we theoretically have the image dimensions, we can create better thumbnails...
			img: createWsrvSrc(src, { h: 1080, w: 1920, fit: 'contain' }),
			alt: alts[srcs.indexOf(src)],
			w: 1920,
			h: 1080
		}));
		bp.open({
			items,
			inline: true,
			scale: 1,
			intro: 'fadeup',
			noClose: true,
			onImageClick(inlineContainer, inlineActiveItem) {
				const bpImg = inlineContainer.querySelector('.bp-img');
				BiggerPicture({ target: document.body }).open({
					items: items.map((item) => ({
						...item,
						element: bpImg
					})),
					position: inlineActiveItem.i,
					onUpdate(c, fullScreenActiveItem) {
						bp.setPosition(fullScreenActiveItem.i);
						setTimeout(() => {
							// update item element for close transition
							let elements = inlineContainer.querySelectorAll('.bp-img');
							fullScreenActiveItem.element = elements[elements.length - 1];
						}, 0);
					},
					onOpen: () => inlineContainer.classList.add('hide-controls'),
					onClosed: () => inlineContainer.classList.remove('hide-controls')
				});
				return true;
			}
		});
	});
</script>

<div class="carousel-container" bind:this={carouselContainer} />

<style lang="scss">
	@use 'sass:map';
	@import 'src/lib/styles/variables.scss';
	.carousel-container {
		position: relative;
		width: 100vw;
		height: 300px;
		margin: 0 calc(-1 * var(--global-padding));
	}
	@media (min-width: map.get($breakpoints, 'xl')) {
		.carousel-container {
			width: 100%;
			height: 400px;
			margin: 0;
		}
	}
</style>
