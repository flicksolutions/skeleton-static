<script>



    /** @type {import('./$types').LayoutData} */
    export let data;
    const { sections, title } = data;
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