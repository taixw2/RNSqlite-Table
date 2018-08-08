import { SubStatement } from "../base/constants";
import { ActionResultType, LimitParams } from "../index.d";

export default function limit(data: LimitParams): ActionResultType {
  return {
    stmtObject: {},
    type: SubStatement.LIMIT,
    get stmt() { return ""; },
  };
}
