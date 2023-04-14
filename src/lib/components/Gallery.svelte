<script>
    import Carousel from 'svelte-carousel';
    import { browser } from '$app/environment';
    import { breakpoints, ghuser, ghrepo, ghbranch } from '$lib/config';

    export let srcs = [];
    export let alts = [];

    function createWsrvSrc(src, options = {}) {
        const params = new URLSearchParams({
            output: 'webp',
            ...options
        });
        const githubUrl = `https://raw.githubusercontent.com/${ghuser}/${ghrepo}/${ghbranch}/src/lib/assets/${src}`;

        return `https://wsrv.nl/?url=${githubUrl}&${params}`;
    }

    function createWsrvSrcSet(src, sizes = [300, 900, 1500, 2100, 3000]) {
        return sizes.map(size => `${createWsrvSrc(src, { w: size })} ${size}w`).join(', ');
    }

</script>

{#if browser}
<div class="carousel-container">
    <Carousel>
            {#each srcs as src, i}
                <img src={createWsrvSrc(src,{w: 300})} srcset={createWsrvSrcSet(src)} sizes="{`(min-width:${breakpoints.md}) 30vw, 100vw`}" alt="{alts[i]}" />
            {/each}
    </Carousel>
</div>
{/if}

<style lang="scss">
    .carousel-container {
        max-width: 100%;

        :global(img) {
            max-width: 100%;
            height: 200px;
            object-fit: contain;
        }
    }
</style>