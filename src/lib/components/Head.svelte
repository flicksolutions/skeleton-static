<script>
	import logo from '$lib/assets/logo.svg';
	import Menu from '$lib/components/Menu.svelte';
	import { onMount } from 'svelte';
	import { tweened } from 'svelte/motion';
	import { cubicInOut } from 'svelte/easing';

	export let title;
	export let menuData;
	export let br;

	const headerHeight = tweened(8, {
		duration: 300,
		easing: cubicInOut
	});

	let major, minor;

	if (title.includes(' - ')) {
		[major, minor] = title.split(' - ');
	} else {
		major = title;
		minor = '';
	}

	let scrollY = 0;
	let oldscroll = 0;
	let open,
		small = false;

	function handleMenuClick() {
		small = true;
		if (br === 'sm') open = !open;
	}

	onMount(() => {
		oldscroll = scrollY;
	});

	$: $headerHeight = small ? 2.5 : 8; // values are between --small-header-height and --header-height
</script>

<svelte:window
	bind:scrollY
	on:wheel|passive={(e) => {
		if (e.deltaY > 15 && !small) {
			small = true;
		} else if (e.deltaY < -15 && small) {
			small = false;
		}
	}}
	on:touchmove|passive={() => {
		const deltaY = scrollY - oldscroll;
		console.log(deltaY);
		if (deltaY > 15 && !small) {
			small = true;
		} else if (deltaY < -15 && small) {
			small = false;
		}
	}}
	on:touchstart|passive={() => {
		oldscroll = scrollY;
	}}
/>

<header class:small class:open style="--header-height: {$headerHeight}rem">
	<img src={logo} alt="Logo" />
	<h1>
		{#if br != 'sm'}
			{title}
		{:else if !small}
			{major} {minor}
		{:else}
			{major}
		{/if}
	</h1>
	<Menu data={menuData} {br} {open} on:menuClick={handleMenuClick} />
</header>

<style lang="scss">
	@use 'sass:map';
	@import 'src/lib/styles/variables.scss';
	header {
		display: grid;
		grid-template-columns: 1fr 2fr auto;
		grid-template-rows: var(--header-height);
		align-items: center;
		padding: 0.8rem var(--global-padding);
		background-color: var(--bg-color);
		position: sticky;
		top: 0;
		z-index: 100;
		box-shadow: 0 0 10px var(--shadow-color);
		height: var(--header-height);

		h1 {
			font-size: 1.5rem;
			font-weight: 800;
			justify-self: center;
			color: var(--title-color);
			grid-row: 1;
		}
		img {
			justify-self: start;
			max-height: 100%;
			grid-row: 1;
		}
		&.open {
			height: 26rem;
			grid-template-rows: var(--header-height) 18rem;
		}

		* {
			min-height: 0;
		}

		&.small {
			&.open {
				height: 21rem;
				grid-template-rows: var(--header-height) 18rem;
			}
		}
	}
	@media (min-width: map.get($breakpoints, 'md')) {
		header {
			grid-template-columns: auto 3fr;
			grid-template-rows: var(--header-height) calc(var(--padding-md) + var(--menu-height));
			height: calc(var(--header-height) + var(--padding-md) + var(--menu-height));
			&.small {
				height: calc(var(--header-height) + var(--small-header-padding) + var(--menu-height));
				grid-template-rows: var(--header-height) calc(
						var(--small-header-padding) + var(--menu-height)
					);
				img {
					width: var(--header-height);
				}
			}
		}

		img {
			height: 100%;
			width: var(--header-height);
		}
	}
</style>
