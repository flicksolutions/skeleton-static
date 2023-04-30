<script>
    /** @type {import('./$types').LayoutData} */
    export let data;
    const { menuContent, title, logos, footerContent } = data;

    import "bigger-picture/css";
    import '$lib/styles/style.scss';
    import Head from '$lib/components/Head.svelte';
    import Foot from '$lib/components/Foot.svelte';
    import { breakpoints } from '$lib/config.json';
    import { onMount } from 'svelte';

    let windowWidth = 0;
    let br;

    const setBr = () => {
        for (const [breakpoint, width] of Object.entries(breakpoints)) {
            if (windowWidth >= width) {
            br = breakpoint;
            } else {
            break; // Stop iterating when the first breakpoint that doesn't match is found
            }
        }
    }

    onMount(() => {
        setBr();
    });

</script>

<svelte:window on:resize={setBr} bind:innerWidth={windowWidth} />

<Head {title} menuData={menuContent} {br} />

<main>
    <slot />
</main>

<footer>
    <Foot {logos} content={footerContent} {br} />
</footer>

<style lang="scss">
</style>