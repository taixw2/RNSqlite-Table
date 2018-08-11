import * as Const from "../base/constants";
import { IActionResultType } from "./../index.d";

export default function group(data: string | string[]): IActionResultType {
  return {
    data: {},
    type: Const.SubStatement.GROUP,
    getStatementInfo() { return { stmt: "", value: [] }; },
  };
}
