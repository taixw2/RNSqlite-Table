
export const isEmpty = (object: object) => !Object.keys(object).length;
export const isPlainObject = (object: any) => Object.prototype.toString.call(object) === "[object Object]";
export const soryObject = (object: { [key: string]: any }, keyRules: string[]) => {
  return keyRules.map((key) => object[key]).filter((_) => !!_);
};
