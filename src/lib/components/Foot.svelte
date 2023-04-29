<script>
    export let logos;
    export let content;
    export let br;



</script>


{#if br}
    <div>{@html content[br]}</div>
    <div>
        {#each logos[br] as logo }
            <img src="{logo.src}" alt="{logo.alt}"/>
        {/each}
    </div>
{/if}