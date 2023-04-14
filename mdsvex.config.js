import { defineMDSveXConfig as defineConfig } from 'mdsvex';
import abbr from 'remark-abbr';
import slug from 'rehype-slug';
import autolink from 'rehype-autolink-headings';

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
		  title: tree_to_string(node),
		});
	  });

	  if (!vFile.data.fm) vFile.data.fm = {};
	  vFile.data.fm.headings = vFile.data.headings;
	};
  };

  // Writes the image paths of all images between the opening and closing tags of a Gallery component as props to that component.
  function addImgAsProps() {
	let visit;
	return async function transformer(tree) {
		if (!visit) {
			visit = (await import('unist-util-visit')).visit;
		}
		visit(tree, 'html', (node) => {
			if (node.value.includes('<Gallery')) {
				const regexp = /(?<=\]\(\.\.\/assets\/)(.+?)(?=\))/g;
				let srcs = node.value.match(regexp);
				const alts = node.value.match(/(?<=!\[)(.+?)(?=\]\()/g);
				if (!srcs) return
				node.value = `<Gallery srcs={${JSON.stringify(srcs)}} alts={${JSON.stringify(alts)}}></Gallery>`;
			}
		}
		);
	};
  }

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

	smartypants: {
		dashes: 'oldschool'
	},

	remarkPlugins: [
		abbr,
		headings,
		addImgAsProps
	],
	rehypePlugins: [
		slug,
		[ autolink, { behavior: 'wrap' } ],
		//removePTagsFromImages
	]
});

export default config;
