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
		gap: var(--padding-sm);
		grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));

		:global(.hero) {
			container-type: inline-size;

			:global(img):first-of-type {
				width: 100%;
				object-fit: cover;
			}
		}
	}
	@container (width > 1px) {
		:global(img):first-of-type {
			height: 60cqw;
			object-fit: cover;
		}
	}

	@media (min-width: map.get($breakpoints, 'md')) {
		.columns {
			gap: var(--padding-md);
			/*:global(.hero img:first-of-type) {
				height: 32vw;
			}*/
		}
	}

	@media (min-width: map.get($breakpoints, 'lg')) {
		.columns {
			gap: var(--padding-lg);
			/*:global(.hero img:first-of-type) {
				height: 25vw;
			}*/
		}
	}

	@media (min-width: map.get($breakpoints, 'xl')) {
		.columns {
			gap: var(--padding-xl);
			//grid-template-columns: repeat(auto-fit, minmax(20%, auto));
		}
	}
</style>
