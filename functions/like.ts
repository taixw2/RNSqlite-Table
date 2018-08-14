import * as Const from "../base/constants";
import { IActionResultType } from "../index.d";

export default function like(data: string): IActionResultType {
  const statement = `LIKE ${data}`;
  return {
    data: {},
    type: Const.SubStatement.LIKE,
    getStatementInfo() { return { stmt: statement, value: [] }; },
  };
}
