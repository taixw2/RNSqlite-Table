
export const flat = (array: any[]) => Array.prototype.concat.apply([], array);
export const last = (array: any[]) => array[array.length - 1];

export const objectIsEmpty = (object: object) => !Object.keys(object).length;
export const isPlainObject = (object: object) => Object.prototype.toString.call(object) === "[object Object]";
