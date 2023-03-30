
export const prerender = true;
//console.log(Content);

/** @type {import('./$types').LayoutLoad} */
export async function load() {
    const Content = await import ("$lib/content/Content.md");
    return Content.metadata.headings.reduce((acc, heading) => {
        if (!acc.title && heading.level === 1) {
            acc.title = heading.title;
        } else if (heading.level === 2) {
            acc.sections.push(heading.title);
        }
        return acc;
    }, {title: "", sections: []});
}