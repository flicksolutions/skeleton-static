<script>
    /** @type {import('./$types').LayoutData} */
    export let data;
    const { sections, title } = data;

    import "bigger-picture/css";
    import '$lib/styles/style.scss';
    import Head from '$lib/components/Head.svelte';
    import Foot from '$lib/components/Foot.svelte';
    import { footer, breakpoints } from '$lib/config.json';
    import { onMount } from 'svelte';

    let windowWidth = 0;
    let br;

    /**
     * Creates an object with the same keys as the breakpoints object, and the values of the given attribute of the given object.
     * If the given object does not have a value for a given breakpoint, the value of the previous breakpoint is used.
    */
    function getAttrByBreakpoint(originalObject, attr) {
        const brKeys = Object.keys(breakpoints);
        const modifiedObject = {};
        brKeys.forEach((breakpoint, i) => {
            modifiedObject[breakpoint] = originalObject[breakpoint]?.[attr] || modifiedObject[brKeys[i-1]];
        });
        return modifiedObject;
    }

    const logos = getAttrByBreakpoint(footer, 'logos');
    const footerContent = getAttrByBreakpoint(footer, 'content');

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

<Head {title} menuData={sections} {br} />

<main>
    <slot />
</main>

<footer>
    <Foot {logos} content={footerContent} {br} />
</footer>

<style lang="scss">
</style>