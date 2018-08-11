import * as Const from "../base/constants";
import { IActionResultType, OrderParams } from "../index.d";

export default function order(data: OrderParams): IActionResultType {
  return {
    data: {},
    type: Const.SubStatement.ORDER,
    getStatementInfo() { return { stmt: "", value: [] }; },
  };
}
