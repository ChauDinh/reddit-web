/**
 * If the type of window is undefined => we are in server
 * Else => we are in browser.
 */

export const isServer = () => typeof window === "undefined";
