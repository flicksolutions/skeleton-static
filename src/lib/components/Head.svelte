<script>
    import Logo from '$lib/assets/logo.svg';
    import Menu from '$lib/components/Menu.svelte';

    export let title;
    export let menuData;
    export let br;

</script>
<header>
    <img src="{Logo}" alt="Logo" />
    <h1>{@html title}</h1>
    <Menu data={menuData} {br} />
</header>

<style lang="scss">
    header {
        display: grid;
        grid-template-columns: 1fr 2fr 1fr;
        align-items: center;
        padding: var(--global-padding);
        background-color: var(--bg-color);

    }
    h1 {
        font-size: 1.3rem;
        justify-self: center;
        width: 30vw;
        color: var(--title-color);
    }
    img {
        height: 100%;
        justify-self: start;
        max-height: 13vh;
    }
</style>