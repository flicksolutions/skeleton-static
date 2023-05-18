<script>
	import { onMount } from 'svelte';
	import { breakpoints } from '$lib/config.json';

	let parentContainer;
	let parentContainerWidth = 0;
	let textnode = false;
	let fontSize = 24;
	//let fontStretch = 100;

	$: {
		if (textnode && parentContainerWidth > breakpoints.md - 48) {
			const quotient = parentContainerWidth / (textnode.scrollWidth + parentContainerWidth * 0.1);
			fontSize = Math.min(Math.max(16, quotient * fontSize), 90);
			//fontStretch = Math.min(Math.max(300, quotient * fontStretch), 700);
		} else if (parentContainerWidth < !breakpoints.md - 48) {
			fontSize = 24;
		}
	}

	onMount(() => {
		textnode = parentContainer.querySelector('figcaption');
	});
</script>

<figure
	class="img-text"
	bind:this={parentContainer}
	bind:clientWidth={parentContainerWidth}
	style="--font-size: {fontSize}px"
>
	<slot />
	<div class="img-text__shadowbox" style="height:{fontSize + 10}px; top: 5px;" />
</figure>

<style lang="scss">
	@use 'sass:map';
	@import 'src/lib/styles/variables.scss';

	.img-text {
		display: grid;

		margin-left: 0;
		margin-right: 0;

		align-items: end;
		font-family: 'Comfortaa';
		color: var(--color-accent);
		text-align: center;

		@media (min-width: map.get($breakpoints, 'md')) {
			grid-template-columns: 1fr;
			grid-template-rows: 1fr;

			:global(*) {
				grid-column: 1/-1;
				grid-row: 1/-1;
			}
		}

		.img-text__shadowbox {
			display: none;

			@media (min-width: map.get($breakpoints, 'md')) {
				display: block;
				position: relative;
				width: 100%;
				background-color: white;
				padding: 1.2rem 0;
				background-clip: content-box;
			}
		}

		:global(p) {
			margin: 0;
		}

		:global(img) {
			width: 100%;
			height: auto;
			object-fit: cover;
			max-height: 30vw;
		}

		:global(figcaption) {
			font-size: var(--font-size, 3rem);
			font-stretch: var(--font-stretch, 100%);

			@media (min-width: map.get($breakpoints, 'md')) {
				z-index: 1;
				white-space: nowrap;
				width: min-content;
				margin: 0 auto;
				padding: 1.2rem 0;
			}
		}
	}
</style>
