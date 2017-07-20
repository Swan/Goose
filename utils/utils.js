/*
 * This function contains a bunch of utility functions that can be used in multiple different 
 * areas.
 */

/*
 * Responsible for adding commas to number values.
 */
export function addCommas (x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}