/**
 * All of these values can be found in the HEADER of an HTTP request done when browsing for more classes
 * in banner, like when you go from page 3 to page 4 of a course query. For best results, use Chrome when
 * getting the appropriate values.
 *
 * Once you have them, copy this file with the name "secrets.js" and replace these fake values with your
 * own values. Be warned that the JSESSIONID has a tendency to expire fairly often (maybe about every 10
 * minutes).
 * @type {string}
 */

export const JSESSIONID = 'D-----7DB5-----F164E-----80CB---'
export const Cookie = `JSESSIONID=${JSESSIONID}; __utma=...; _ga=...; __utmz=...; _gid=...`
export const XSynchronizerToken = '6f...3e5-9..f-4...-b..3-e.....8a1..1'

export const BACKEND_ADDRESS = "127.0.0.1:27017"
export const BACKEND_PASSWORD = "hi"
