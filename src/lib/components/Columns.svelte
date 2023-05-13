<script>
</script>

<div class="columns">
	<slot />
</div>

<style lang="scss">
	@use 'sass:map';
	@import 'src/lib/styles/variables.scss';

	.columns {
		display: flex;
		flex-flow: row wrap;
		justify-content: space-between;
		gap: var(--padding-sm);

		/*:global(img) {
            max-width: 100%;
		}*/
	}

	@media (min-width: map.get($breakpoints, 'md')) {
		.columns {
			flex-flow: row nowrap;
			gap: var(--padding-md);

			> :global(*) {
				// flex: 1 0 30vw;
			}

			:global(img) {
				min-width: 30vw;
				width: 30vw;
			}
		}
	}

	@media (min-width: map.get($breakpoints, 'lg')) {
		.columns {
			gap: var(--padding-lg);

			> :global(*) {
				//flex: 1 0 40vw;
			}
		}
	}

	@media (min-width: map.get($breakpoints, 'xl')) {
		.columns {
			> :global(*) {
				//flex: 1 1 40vw;
				flex-grow: 1;
			}
		}
	}
</style>
