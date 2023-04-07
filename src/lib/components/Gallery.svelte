<script>
    import Carousel from 'svelte-carousel';
    import { browser } from '$app/environment';
</script>

{#if browser}
    <Carousel>
        <slot></slot>
    </Carousel>
{/if}