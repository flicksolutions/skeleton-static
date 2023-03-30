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

const config = defineConfig({
	extensions: ['.svelte.md', '.md', '.svx'],

	smartypants: {
		dashes: 'oldschool'
	},

	remarkPlugins: [
		abbr,
		headings
	],
	rehypePlugins: [
		slug,
		[ autolink, { behavior: 'wrap' } ]
	]
});

export default config;
