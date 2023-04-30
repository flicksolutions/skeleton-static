import { breakpoints } from '$lib/config.json';

/**
 * Creates an object with the same keys as the breakpoints object, and the values of the given attribute of the given object.
 * If the given object does not have a value for a given breakpoint, the value of the previous breakpoint is used.
*/
export function getAttrByBreakpoint(originalObject, attr) {
    const brKeys = Object.keys(breakpoints);
    const modifiedObject = {};
    brKeys.forEach((breakpoint, i) => {
        modifiedObject[breakpoint] = originalObject[breakpoint]?.[attr] || modifiedObject[brKeys[i-1]];
    });
    return modifiedObject;
}