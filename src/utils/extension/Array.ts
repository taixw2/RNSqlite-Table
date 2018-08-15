
export const flat = (array: any[]) => Array.prototype.concat.apply([], array);
export const last = (array: any[]) => array[array.length - 1];
export const first = (array: any[]) => array[0];
export const isEmpty = (array: any[]) => array.length === 0;
export const clear = (array: any[]) => array.length = 0;
