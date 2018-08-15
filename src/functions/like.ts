import { IActionResultType } from "../../types/types";
import * as Const from "../base/constants";

export default function like(data: string): IActionResultType {
  const statement = `LIKE ${data}`;
  return {
    data: {},
    type: Const.SubStatement.LIKE,
    getStatementInfo() { return { stmt: statement, value: [] }; },
  };
}
