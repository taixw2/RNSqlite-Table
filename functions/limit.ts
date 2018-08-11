import * as Const from "../base/constants";
import { IActionResultType } from "../index.d";

export default function limit(data: number): IActionResultType {
  return {
    data: {},
    type: Const.SubStatement.LIMIT,
    getStatementInfo() { return { stmt: "", value: [] }; },
  };
}
