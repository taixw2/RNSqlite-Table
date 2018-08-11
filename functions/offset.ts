import * as Const from "../base/constants";
import { IActionResultType } from "../index.d";

export default function offset(data: number): IActionResultType {
  return {
    data: {},
    type: Const.SubStatement.OFFSET,
    getStatementInfo() { return { stmt: "", value: [] }; },
  };
}
