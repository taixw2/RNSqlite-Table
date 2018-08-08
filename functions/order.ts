import { SubStatement } from "../base/constants";
import { ActionResultType, OrderParams } from "../index.d";

export default function order(data: OrderParams): ActionResultType {
  return {
    stmtObject: {},
    type: SubStatement.ORDER,
    get stmt() { return ""; },
  };
}
