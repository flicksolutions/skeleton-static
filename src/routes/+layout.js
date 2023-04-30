
export const prerender = true;
import GithubSlugger from 'github-slugger'
import { header, footer, breakpoints } from '$lib/config.json'
import { getAttrByBreakpoint } from '$lib/functions.js';

const slugger = new GithubSlugger();

/** @type {import('./$types').LayoutLoad} */
export async function load() {
    const logos = getAttrByBreakpoint(footer, 'logos');
    const footerContent = getAttrByBreakpoint(footer, 'content');
    let menuContent = getAttrByBreakpoint(header, 'menu');
    const Content = await import ("$lib/content/Content.md");
    const title = Content.metadata.headings.find(heading => heading.level === 1)?.title;
    if (!menuContent.sm) {
        menuContent = Content.metadata.headings.reduce((acc, heading) => {
            if (!acc.title && heading.level === 1) {
                acc.title = heading.title;
            } else if (heading.level === 2) {
                acc.sections.push({title: heading.title, href: slugger.slug(heading.title) } );
            }
            return acc;
        }, {title: "", sections: []});
    }
    return {
        logos,
        footerContent,
        menuContent,
        title,
    }
}