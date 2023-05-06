<script>
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { createWsrvSrc, createWsrvSrcSet } from '$lib/functions';
	import BiggerPicture from 'bigger-picture/svelte';

	let bp;
	let carouselContainer;
	export let srcs = [];
	export let alts = [];

	/*function openGallery(e) {
        bp.open({
            items: srcs.map(src => ({
                img: createWsrvSrcSet(src),
                alt: alts[srcs.indexOf(src)],
            })),
            el: e.target,
        });
    }*/

	onMount(() => {
		bp = BiggerPicture({
			target: carouselContainer
		});
		const items = srcs.map((src) => ({
			thumb: createWsrvSrc(src, { h: 300 }),
			img: createWsrvSrcSet(src),
			alt: alts[srcs.indexOf(src)]
		}));
		bp.open({
			items,
			inline: true,
			scale: 1,
			intro: 'fadeup',
			noClose: true,
			onImageClick(inlineContainer, inlineActiveItem) {
				/*if (!(inlineContainer.clientWidth < 800)) {
                    console.log("not small");
                return;
                }*/
				const bpImg = inlineContainer.querySelector('.bp-img');
				BiggerPicture({ target: document.body }).open({
					items: items.map((item) => ({
						...item,
						element: bpImg
					})),
					position: inlineActiveItem.i,
					onUpdate(c, fullScreenActiveItem) {
						bp.setPosition(fullScreenActiveItem.i);
						setTimeout(() => {
							// update item element for close transition
							let elements = inlineContainer.querySelectorAll('.bp-img');
							fullScreenActiveItem.element = elements[elements.length - 1];
						}, 0);
					},
					onOpen: () => inlineContainer.classList.add('hide-controls'),
					onClosed: () => inlineContainer.classList.remove('hide-controls')
				});
				return true;
			}
		});
	});
</script>

{#if browser}
	<div class="carousel-container" bind:this={carouselContainer}>
		<!--{#each srcs as src, i}

        <a
            href={createWsrvSrc(src)}
            on:click|preventDefault={(e) => openGallery(e)}
        >
            <img src={createWsrvSrc(src,{w: 300})} srcset={createWsrvSrcSet(src)} sizes="{`(min-width:${breakpoints.md}) 30vw, 100vw`}" alt="{alts[i]}" />
        </a>
        {/each}-->
	</div>
{/if}

<style lang="scss">
	.carousel-container {
		position: relative;
		width: 100%;
		height: 300px;

		/*:global(img) {
            max-width: 100%;
            height: 200px;
            object-fit: contain;
        }*/
	}
</style>
