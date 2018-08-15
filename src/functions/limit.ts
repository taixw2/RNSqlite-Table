import { IActionResultType } from "../../types/types";
import * as Const from "../base/constants";

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
