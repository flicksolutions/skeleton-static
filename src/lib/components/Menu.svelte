<script>
    import Burger from '$lib/components/Burger.svelte';

    export let br;
    export let data;

    let open = false;
</script>

{#if br === 'sm'}
    <Burger {open} />
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