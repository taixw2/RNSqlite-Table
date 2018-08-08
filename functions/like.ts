import { SubStatement } from "../base/constants";
import { ActionResultType } from "../index.d";

export default function like(data: string): ActionResultType {
  return {
    stmtObject: {},
    type: SubStatement.LIKE,
    get stmt() { return ""; },
  };
}
