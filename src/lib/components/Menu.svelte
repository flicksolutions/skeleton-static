<script>
	import Burger from '$lib/components/Burger.svelte';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let br = 'sm';
	export let data;
	export let open = false;
	let menuItems;
	$: {
		if (Array.isArray(data)) {
			menuItems = data;
		} else if (br) {
			menuItems = data[br];
		} else if (data) {
			menuItems = data.sm;
		} else {
			menuItems = [];
		}
	}

	let defer = open;
	$: setTimeout(() => {
		defer = open;
	}, 300);
</script>

<Burger {open} on:menuClick />
<ul class:open>
	{#each menuItems as section}
		<li>
			<a href="#{section.href}" on:click={() => dispatch('menuClick')}>{section.title}</a>
		</li>
	{/each}
</ul>

<style lang="scss">
	@use 'sass:map';
	@import 'src/lib/styles/variables.scss';
	ul {
		display: none;
		grid-column: 1/-1;
		flex-flow: column nowrap;
		list-style-type: none;
		margin: 0 calc(-1 * var(--global-padding));
		min-height: 0;
		padding: 0;
		opacity: 0;
		transition: opacity 0.3s ease-in-out, margin-bottom 0.3s ease-in-out;
		&.open {
			display: flex;
			margin-bottom: calc(-1 * var(--global-padding));
			opacity: 1;
		}
		a {
			color: var(--text-color);
			text-decoration: none;
			display: block;
		}
		li {
			line-height: 2;
			font-size: 1.5rem;
			font-weight: 500;
			border-top: solid 2px var(--shadow-color);
			padding: 0 var(--global-padding);
		}
	}

	@media (min-width: map.get($breakpoints, 'md')) {
		:global(.small) ul {
			margin-top: 0.8rem;
		}

		ul {
			display: flex;
			border-top: solid 2px var(--shadow-color);
			height: 100%;
			opacity: 1;
			grid-row: 2;
			grid-column: 1 / -1;
			flex-flow: row nowrap;
			justify-content: space-between;
			padding: 0 var(--global-padding);
			margin-top: var(--padding-md);

			li {
				border: none;
				padding: 0;
			}
		}
	}
</style>
