<script>
    import Burger from '$lib/components/Burger.svelte';

    export let br = 'sm';
    export let data;
    let menuItems;
    $:{
        if (typeof data === "Array") {
            menuItems = data;
        } else if (br) {
            menuItems = data[br];
        } else if (data) {
            menuItems = data.sm;
        } else {
            menuItems = [];
        }
    }
    let open = false;
</script>

{#if br === 'sm'}
    <Burger {open} on:menuClick={() => open= !open} />
{/if}

{#if open || br !== 'sm'}
    <ul class:open>
        {#each menuItems as section}
            <li>
                <a href="#{section.href}">{section.title}</a>
            </li>
        {/each}
    </ul>
{/if}

<style lang="scss">
    ul {
        grid-column: 1/-1;
        display: flex;
        flex-flow: column nowrap;
        list-style-type: none;
        margin: 0 calc(-1 * var(--global-padding));
        padding: 0;
        &.open {
            margin-bottom: calc(-1 * var(--global-padding));
        }
        a {
            color: var(--text-color);
            text-decoration: none;
            display: block;
        }
        li {
            line-height: 2;
            font-size: 1.5rem;
            font-weight: 500;
            border-top: solid 2px var(--shadow-color);
            padding: 0 var(--global-padding);
        }
    }

</style>