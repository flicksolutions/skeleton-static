export const prerender = true;
import GithubSlugger from 'github-slugger';
import { header, footer } from '$lib/config.json';
import { getAttrByBreakpoint } from '$lib/functions.js';
import imageSize from 'image-size';

const slugger = new GithubSlugger();

/** @type {import('./$types').LayoutLoad} */
export async function load() {
	const logos = getAttrByBreakpoint(footer, 'logos');
	const footerContent = getAttrByBreakpoint(footer, 'content');
	let menuContent = getAttrByBreakpoint(header, 'menu');
	const Content = await import('$lib/content/Content.md');
	const title = Content.metadata.headings.find((heading) => heading.level === 1)?.title;
	if (!menuContent.sm) {
		menuContent = Content.metadata.headings.reduce(
			(acc, heading) => {
				if (!acc.title && heading.level === 1) {
					acc.title = heading.title;
				} else if (heading.level === 2) {
					acc.sections.push({ title: heading.title, href: slugger.slug(heading.title) });
				}
				return acc;
			},
			{ title: '', sections: [] }
		);
	}
	const dimensions = {};
	Content.metadata.imgs.forEach((img) => {
		const { width, height } = imageSize(`./static/${img.split('#')[0]}`); // Image path
		dimensions[img] = { width, height };
	});

	return {
		logos,
		footerContent,
		menuContent,
		title,
		dimensions
	};
}
