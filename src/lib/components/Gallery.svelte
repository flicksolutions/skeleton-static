<script>
    import Carousel from 'svelte-carousel';
    import { browser } from '$app/environment';
</script>

{#if browser}
<div class="carousel-container">
    <Carousel>
        <slot></slot>
    </Carousel>
</div>
{/if}

<style lang="scss">
    .carousel-container {
        max-width: 100%;

        :global(img) {
            max-width: 100%;
            height: auto;
        }
    }
</style>