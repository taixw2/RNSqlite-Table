import * as Const from "../base/constants";
import { IActionResultType, WhereParams } from "./../index.d";

export default function where(data: WhereParams): IActionResultType {
  return {
    data: {},
    type: Const.SubStatement.WHERE,
    getStatementInfo() { return { stmt: "", value: [] }; },
  };
}
