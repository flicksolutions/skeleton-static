<script>
	import logo from '$lib/assets/logo.svg';
	import Menu from '$lib/components/Menu.svelte';
	import { onMount } from 'svelte';

	export let title;
	export let menuData;
	export let br;

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
		small,
		blocked = false;

	$: {
		if (!blocked) {
			if (scrollY > oldscroll && !small) {
				small = true;
				blocked = true;
			} else if (scrollY < oldscroll && small) {
				small = false;
				blocked = true;
			}
			oldscroll = scrollY;
		}
	}

	onMount(() => {
		oldscroll = scrollY;
	});
</script>

<svelte:window bind:scrollY />

<header
	class:small
	class:open
	on:transitionend={() => {
		oldscroll = scrollY;
		blocked = false;
	}}
>
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
	<Menu data={menuData} {br} {open} on:menuClick={() => (open = !open)} />
</header>

<style lang="scss">
	@use 'sass:map';
	@import 'src/lib/styles/variables.scss';
	header {
		display: grid;
		grid-template-columns: 1fr 2fr 1fr;
		grid-template-rows: var(--header-height);
		align-items: center;
		padding: 0.8rem var(--global-padding);
		background-color: var(--bg-color);
		position: sticky;
		top: 0;
		z-index: 100;
		box-shadow: 0 0 10px var(--shadow-color);
		height: 8rem;
		transition: height 0.3s ease-in-out;

		&.open {
			height: 26rem;
			grid-template-rows: var(--header-height) 18rem;
		}

		* {
			min-height: 0;
		}

		&.small {
			height: var(--small-header-height);
			grid-template-rows: var(--small-header-height);
			h1 {
				width: initial;
			}
			&.open {
				height: 21rem;
				grid-template-rows: var(--small-header-height) 18rem;
			}
		}
	}
	@media (min-width: map.get($breakpoints, 'md')) {
		header {
			grid-template-columns: auto 3fr;
			grid-template-rows: var(--header-height) calc(var(--padding-md) + var(--menu-height));
			height: calc(var(--header-height) + var(--padding-md) + var(--menu-height));
			&.small {
				height: calc(var(--small-header-height) + var(--small-header-padding) + var(--menu-height));
				grid-template-rows: var(--small-header-height) calc(
						var(--small-header-padding) + var(--menu-height)
					);
				img {
					width: var(--small-header-height);
				}
			}
		}

		img {
			height: 100%;
			width: var(--header-height);
		}
	}
	h1 {
		font-size: 1.5rem;
		font-weight: 800;
		justify-self: center;
		width: 30vw;
		color: var(--title-color);
		grid-row: 1;
	}
	img {
		justify-self: start;
		max-height: 100%;
		grid-row: 1;
	}
</style>
