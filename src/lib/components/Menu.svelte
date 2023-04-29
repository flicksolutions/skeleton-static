<script>
    import Burger from '$lib/components/Burger.svelte';

    export let br;
    export let data;

    let open = false;
</script>

{#if br === 'sm'}
    <Burger {open} on:menuClick={() => open= !open} />
{/if}

{#if open || br !== 'sm'}
    <ul>
        {#each data as section}
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
        margin: 0;
        padding: 0;
        a {
            color: var(--text-color);
            text-decoration: none;
        }
        li {
            font-size: 1.3rem;
        }
    }

</style>