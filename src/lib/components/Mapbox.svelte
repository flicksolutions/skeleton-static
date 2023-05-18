<script>
	import { onMount } from 'svelte';
	import { breakpoints } from '$lib/config.json';
	import { PUBLIC_MAPTILER_TOKEN } from '$env/static/public';

	import { Map } from '@onsvisual/svelte-maps'; // for interface see https://github.com/ONSvisual/svelte-maps/blob/main/src/Map.svelte
	import maplibre from 'maplibre-gl';
	import { Marker } from 'maplibre-gl';

	export let location;
	export let adress = '',
		link = '';

	let map;

	onMount(() => {
		map.addControl(new maplibre.NavigationControl(), 'top-left');
		new Marker({ color: 'var(--title-color)' }).setLngLat(location).addTo(map);
	});
</script>

<div class="mapcontainer">
	<Map
		id="map"
		style="https://api.maptiler.com/maps/ch-swisstopo-lbm-vivid/style.json?key={PUBLIC_MAPTILER_TOKEN}"
		location={{ lng: location[0], lat: location[1], zoom: 14 }}
		maxzoom={21}
		minzoom={8}
		bind:map
	/>
</div>

<style lang="scss">
	@use 'sass:map';
	@import 'src/lib/styles/variables.scss';

	.mapcontainer {
		height: 50vh;
		width: 100vw;
		margin-left: calc(-1 * var(--global-padding));
	}
</style>
