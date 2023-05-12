<script>
	import BiggerPicture from 'bigger-picture/svelte';
	import Content from '$lib/content/Content.md';
	import { onMount } from 'svelte';
	import { createWsrvSrc } from '$lib/functions';
	import { fix_position } from 'svelte/internal';

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
		bp.open({
			el: e.target,
			items: [
				{
					img: createWsrvSrc(e.target.attributes.src.value, {
						w: 1920,
						h: 1080,
						fit: 'contain'
					}),
					thumb: createWsrvSrc(e.target.attributes.src.value, {
						w: 192,
						h: 108,
						fit: 'contain'
					}),
					w: 1920,
					h: 1080
				}
			]
		});
	}
</script>

<Content />
