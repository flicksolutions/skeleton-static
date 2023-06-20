<script>
	/** @type {import('./$types').LayoutData} */
	export let data;
	const { menuContent, title, logos, footerContent } = data;

	import 'bigger-picture/css';
	import '$lib/styles/style.scss';
	import { PUBLIC_DEVMODE } from '$env/static/public';
	import Head from '$lib/components/Head.svelte';
	import Foot from '$lib/components/Foot.svelte';
	import { setBr } from '$lib/functions.js';

	let windowWidth;
	$: br = setBr(windowWidth);
</script>

<svelte:window bind:innerWidth={windowWidth} />
<svelte:head>
	<title>{title}</title>
	<meta name="robots" content={PUBLIC_DEVMODE === 'true' ? 'noindex, nofollow' : 'index, follow'} />
	<html lang="de" />
</svelte:head>

<Head {title} menuData={menuContent} {br} />
<main>
	<slot />
</main>
<Foot {logos} content={footerContent} {br} />

<style lang="scss">
	main {
		padding: 0 var(--global-padding);

		:global(*):first-child {
			margin-top: 0;
			padding-top: 0;
		}
	}
</style>
