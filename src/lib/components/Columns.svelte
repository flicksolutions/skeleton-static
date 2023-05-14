<script>
</script>

<div class="columns">
	<slot />
</div>

<style lang="scss">
	@use 'sass:map';
	@import 'src/lib/styles/variables.scss';

	.columns {
		display: grid;
		justify-content: start;
		gap: var(--padding-sm);
	}

	@media (min-width: map.get($breakpoints, 'md')) {
		.columns {
			grid-template-columns: repeat(auto-fit, minmax(30vw, auto));
			gap: var(--padding-md);

			> :global(p) {
				flex-grow: 1;
			}

			> :global(*) {
				flex-basis: content;
			}
		}
	}

	@media (min-width: map.get($breakpoints, 'lg')) {
		.columns {
			gap: var(--padding-lg);
		}
	}

	@media (min-width: map.get($breakpoints, 'xl')) {
		.columns {
			gap: var(--padding-xl);
		}
	}
</style>
