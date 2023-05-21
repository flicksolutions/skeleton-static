import { defineMDSveXConfig as defineConfig } from 'mdsvex';
import abbr from 'remark-abbr';
import slug from 'rehype-slug';
import autolink from 'rehype-autolink-headings';
import unwrap from 'remark-unwrap-images';

function headings() {
	let visit;
	let tree_to_string;
	return async function transformer(tree, vFile) {
		if (!visit) {
			tree_to_string = (await import('mdast-util-to-string')).toString;
			visit = (await import('unist-util-visit')).visit;
		}

		vFile.data.headings = [];

		visit(tree, 'heading', (node) => {
			vFile.data.headings.push({
				level: node.depth,
				title: tree_to_string(node)
			});
		});

		if (!vFile.data.fm) vFile.data.fm = {};
		vFile.data.fm.headings = vFile.data.headings;
	};
}

function imgs() {
	let visit;
	return async function transformer(tree, vFile) {
		if (!visit) {
			visit = (await import('unist-util-visit')).visit;
		}

		vFile.data.imgs = [];

		visit(tree, 'image', (node) => {
			vFile.data.imgs.push(node.url);
		});

		if (!vFile.data.fm) vFile.data.fm = {};
		vFile.data.fm.imgs = vFile.data.imgs;
	};
}

// Writes the image paths of all images between the opening and closing tags of a Gallery component as props to that component.
function addImgAsProps() {
	let visit;
	return async function transformer(tree) {
		if (!visit) {
			visit = (await import('unist-util-visit')).visit;
		}
		visit(tree, 'html', (node) => {
			if (node.value.includes('<Gallery')) {
				const regexp = /(?<=\]\()(.+?)(?=\))/g;
				let srcs = node.value.match(regexp);
				const alts = node.value.match(/(?<=!\[)(.+?)(?=\]\()/g);
				if (!srcs) return;
				node.value = `<Gallery srcs={${JSON.stringify(srcs)}} alts={${JSON.stringify(
					alts
				)}}></Gallery>`;
			}
		});
	};
}

// rehype Plugin to wrap images in a link to the image itself
/*function autolinkImages() {
	let visit;
	return async function transformer(tree) {
		if (!visit) {
			visit = (await import('unist-util-visit')).visit;
		}
		visit(tree, 'element', (node, index, parent) => {
			if (node.tagName === 'img') {
				const linkNode = {
					type: 'element',
					tagName: 'a',
					properties: {
						href: node.properties.src,
						target: '_self',
						class: 'lightbox',
						'data-sveltekit-preload-data': 'off'
					},
					children: [node]
				};
				node.properties = {
					srcset: createWsrvSrcSet(node.properties.src),
					sizes: `(min-width: ${breakpoints.lg}) 800px, 96vw`, //TODO: set sizes
					...node.properties
				};
				parent.children[index] = linkNode;
			}
		});
	};
}*/

/*function removePTagsFromImages() {
	return function (tree) {
	  tree.children.forEach((node, i) => {
		if (node.tagName === 'p' && node.children.length === 1 && node.children[0].tagName === 'img') {
			tree.children[i] = node.children[0]
		  }
	  })
	}
  }*/

const config = defineConfig({
	extensions: ['.svelte.md', '.md', '.svx'],

	layout: {
		_: './src/lib/components/mdsvex.svelte'
	},

	smartypants: {
		dashes: 'oldschool'
	},

	remarkPlugins: [abbr, headings, imgs, addImgAsProps, unwrap],
	rehypePlugins: [
		slug,
		[autolink, { behavior: 'wrap' }]
		//removePTagsFromImages
	]
});

export default config;
