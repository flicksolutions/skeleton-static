<script>
    import Logo from '$lib/assets/logo.svg';
    import Menu from '$lib/components/Menu.svelte';

    export let title;
    export let menuData;
    export let br;

</script>

<img src="{Logo}" alt="Logo" />
<h1>{@html title}</h1>
<Menu data={menuData} {br} />