<script>
	import { createWsrvSrc } from '$lib/functions';

	export let logos;
	export let content;
	export let br;
</script>

<footer>
	{#if br}
		<div class="info">{@html content[br]}</div>
		<div class="logos">
			{#each logos[br] as logo}
				<img src={createWsrvSrc(logo.src)} alt={logo.alt} />
			{/each}
		</div>
	{/if}
</footer>

<style lang="scss">
	@use 'sass:map';
	@import 'src/lib/styles/variables.scss';

	footer {
		display: flex;
		position: sticky;
		bottom: 0;
		justify-content: space-between;
		padding: 0.8rem var(--global-padding);
		background-color: var(--bg-color);
		color: var(--text-color);
		height: var(--small-height);
		box-shadow: 0px -5px 4px rgba(0, 0, 0, 0.25);
		* {
			min-height: 0;
		}
	}

	.info {
		font-family: 'Comfortaa', cursive;
		font-size: 1.8rem;
		font-weight: 800;
		text-align: left;
		align-self: end;
		flex-shrink: 0;
		:global(a) {
			color: var(--title-color);
		}
	}

	@media (min-width: map.get($breakpoints, 'md')) {
		.info {
			font-size: 1.5rem;
		}
	}

	.logos {
		img {
			float: right;
			height: 100%;
			min-height: 0;
			&:not(:first-child) {
				margin-right: 0.8rem;
			}
		}
	}
</style>
