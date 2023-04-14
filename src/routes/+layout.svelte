<script>



    /** @type {import('./$types').LayoutData} */
    export let data;
    const { sections, title } = data;

    import "bigger-picture/css";
    import '$lib/styles/style.scss';
</script>

<header>
    {title}
    <nav>
        <ul>
           {#each sections as section }
                <li>{section}</li>
            {/each}
        </ul>
    </nav>
</header>

<main>
    <slot />
</main>

<footer></footer>

<style lang="scss">

</style>