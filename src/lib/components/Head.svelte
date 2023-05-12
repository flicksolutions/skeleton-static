<script>
	import logo from '$lib/assets/logo.svg';
	import Menu from '$lib/components/Menu.svelte';

	export let title;
	export let menuData;
	export let br;

	const [major, minor] = title.split(' - ');

	let scrollY = 0;
	let open = false;
</script>

<svelte:window bind:scrollY />

<header class:small={scrollY > 100} class:open>
	<img src={logo} alt="Logo" />
	<h1>
		{#if br != 'sm'}
			{title}
		{:else if scrollY <= 100}
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
		grid-template-rows: 8rem;
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
			grid-template-rows: 8rem 18rem;
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
			grid-template-rows: 8rem calc(var(--padding-md) + 2rem);
			height: calc(8rem + var(--padding-md) + 2rem);
			&.small {
				height: calc(var(--small-header-height) + var(--small-header-padding) + 2rem);
				grid-template-rows: var(--small-header-height) calc(var(--small-header-padding) + 2rem);
			}
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
