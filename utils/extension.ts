
export const flat = (array: any[]) => Array.prototype.concat.apply([], array);
export const last = (array: any[]) => array[array.length - 1];
