import config from './config.json' assert { type: 'json' };
const { breakpoints, ghuser, ghrepo, ghbranch } = config;

/**
 * Creates an object with the same keys as the breakpoints object, and the values of the given attribute of the given object.
 * If the given object does not have a value for a given breakpoint, the value of the previous breakpoint is used.
 */
export function getAttrByBreakpoint(originalObject, attr) {
	const brKeys = Object.keys(breakpoints);
	const modifiedObject = {};
	brKeys.forEach((breakpoint, i) => {
		modifiedObject[breakpoint] =
			originalObject[breakpoint]?.[attr] || modifiedObject[brKeys[i - 1]];
	});
	return modifiedObject;
}

export function createWsrvSrc(src, options = {}) {
	if (src.startsWith('http')) return src;
	const params = new URLSearchParams({
		output: 'webp',
		...options
	});
	if (src.startsWith('/src/lib/assets/')) src = src.slice(16);
	const githubUrl = `https://raw.githubusercontent.com/${ghuser}/${ghrepo}/${ghbranch}/src/lib/assets/${src}`;

	return `https://wsrv.nl/?url=${githubUrl}&${params}`;
}

export function createWsrvSrcSet(src, sizes = [300, 600, 900, 1500, 2100, 3000]) {
	return sizes
		.map((size) => `${createWsrvSrc(src, { w: size, fit: 'contain' })} ${size}w`)
		.join(', ');
}
