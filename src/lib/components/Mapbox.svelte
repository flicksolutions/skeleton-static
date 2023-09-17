<script>
	import { onMount } from 'svelte';
	import { PUBLIC_MAPTILER_TOKEN } from '$env/static/public';
	import maplibre from 'maplibre-gl';
	import { Marker, Popup } from 'maplibre-gl';

	export let location;
	export let adress = '';
	export let link = '';

	let mapobject;

	onMount(() => {
		mapobject = new maplibre.Map({
			container: 'map',
			style: `https://api.maptiler.com/maps/ch-swisstopo-lbm-vivid/style.json?key=${PUBLIC_MAPTILER_TOKEN}`,
			center: location,
			zoom: 14,
			maxZoom: 21,
			minZoom: 8,
			scrollZoom: false
		});
		mapobject.addControl(new maplibre.NavigationControl(), 'top-left');
		const popup = new Popup({ offset: 25 })
			.setLngLat(location)
			.setHTML(
				`<h3>${adress}</h3><p><a href="${link}" target="_blank" rel="noopener noreferrer">Wegbeschreibung (Google Maps)</a></p>`
			);

		new Marker({ color: 'var(--title-color)' })
			.setLngLat(location)
			.setPopup(popup)
			.addTo(mapobject);
	});
</script>

<svelte:head>
	<link rel="stylesheet" href="https://unpkg.com/maplibre-gl@3.3.1/dist/maplibre-gl.css" />
</svelte:head>

<div class="mapcontainer">
	<div id="map" />
</div>

<style lang="scss">
	@use 'sass:map';
	@import 'src/lib/styles/variables.scss';

	.mapcontainer {
		height: 50vh;
		width: 100vw;
		margin-left: calc(-1 * var(--global-padding));
	}

	#map {
		height: 100%;
		width: 100%;
	}
</style>
