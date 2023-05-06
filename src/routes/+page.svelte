<script>
	import BiggerPicture from 'bigger-picture/svelte';
	import Content from '$lib/content/Content.md';
	import { onMount } from 'svelte';
	import { createWsrvSrc } from '$lib/functions';

	let bp;

	onMount(() => {
		bp = BiggerPicture({
			target: document.body
		});
		addListeners();
	});

	function addListeners() {
		document.querySelectorAll('.lightbox').forEach((el) => {
			el.addEventListener('click', openGallery);
		});
	}

	function openGallery(e) {
		e.preventDefault();
		console.log(e);
		bp.open({
			el: e.target,
			items: [
				{
					img: createWsrvSrc(e.target.attributes.src.value, { w: 9000, we: 'true' })
				}
			]
		});
	}
</script>

<Content />
