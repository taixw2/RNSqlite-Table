import * as Const from "../base/constants";
import { IActionResultType } from "../index.d";

function generator(limitValue: number, offsetValue?: number) {
  const prefix = `LIMIT ${limitValue}`;
  if (typeof offsetValue === "undefined") { return prefix; }
  return `${prefix} OFFSET ${offsetValue}`;
}

export default function limit(limitValue: number, offsetValue?: number): IActionResultType {
  const statement = generator(limitValue, offsetValue);
  return {
    data: {},
    type: Const.SubStatement.LIMIT,
    getStatementInfo() { return { stmt: statement, value: [] }; },
  };
}
