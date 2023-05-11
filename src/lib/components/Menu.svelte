<script>
	import Burger from '$lib/components/Burger.svelte';

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

{#if br === 'sm'}
	<Burger {open} on:menuClick />
{/if}
{#if defer || br !== 'sm'}
	<ul class:open>
		{#each menuItems as section}
			<li>
				<a href="#{section.href}">{section.title}</a>
			</li>
		{/each}
	</ul>
{/if}

<style lang="scss">
	@use 'sass:map';
	@import 'src/lib/styles/variables.scss';
	ul {
		grid-column: 1/-1;
		display: flex;
		flex-flow: column nowrap;
		list-style-type: none;
		margin: 0 calc(-1 * var(--global-padding));
		min-height: 0;
		padding: 0;
		opacity: 0;
		transition: opacity 0.3s ease-in-out, margin-bottom 0.3s ease-in-out;
		&.open {
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
		ul {
			opacity: 1;
			grid-row: 2;
			grid-column: 1 / -1;
			flex-flow: row nowrap;
		}
	}
</style>
