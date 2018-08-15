import { IActionResultType, OrderParams } from "../../types/types";
import * as Const from "../base/constants";
import { extension } from "../utils";

function generator(data: OrderParams) {
  if (extension.String.isString(data)) {
    return data;
  }
  if (Array.isArray(data)) {
    return data.map((column) => {
      if (extension.String.isString(column)) { return column; }
      if (extension.Object.isPlainObject(column)) {
        return Object.entries(column).map((value) => value.join(" ")).join(", ");
      }
      return "";
    }).join(", ");
  }
  return "";
}

export default function order(data: OrderParams): IActionResultType {
  const statement = "ORDER BY " + generator(data);
  return {
    data: {},
    type: Const.SubStatement.ORDER,
    getStatementInfo() { return { stmt: statement, value: [] }; },
  };
}
