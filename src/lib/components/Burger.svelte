<script>
	import { createEventDispatcher } from 'svelte';

	export let open;

	const dispatch = createEventDispatcher();

	function handleClick() {
		dispatch('menuClick');
	}
</script>

<button on:click={handleClick}>
	<svg class:open class:closed={!open} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
		<path
			d="M2.5 6.5h19c.3 0 .5-.2.5-.5s-.2-.5-.5-.5h-19c-.3 0-.5.2-.5.5s.2.5.5.5z"
			class="upper"
		/>
		<path
			d="M2.5 12h19c.3 0 .5-.2.5-.5s-.2-.5-.5-.5h-19c-.3 0-.5.2-.5.5s.2.5.5.5z"
			class="middle"
		/>
		<path
			d="M2.5 17.5h19c.3 0 .5-.2.5-.5s-.2-.5-.5-.5h-19c-.3 0-.5.2-.5.5s.2.5.5.5z"
			class="lower"
		/>
	</svg>
</button>

<style lang="scss">
	@use 'sass:map';
	@import 'src/lib/styles/variables.scss';
	button {
		background: none;
		border: none;
		cursor: pointer;
		width: 2.8rem;
		padding: 0;
		margin: 0;
		display: grid;
		place-items: center;
		justify-self: end;
		filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
		@media (min-width: map.get($breakpoints, 'md')) {
			display: none;
		}
	}
	path {
		stroke-width: 10;
		transition: transform 0.3s ease-in-out;
	}
	.open {
		.upper {
			transform: translate(33.333333%, -5.5%) rotate(45deg);
		}
		.middle {
			opacity: 0;
		}
		.lower {
			transform: translate(-33.333333%, 33%) rotate(-45deg);
		}
	}
</style>
