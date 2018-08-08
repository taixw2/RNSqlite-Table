import { SubStatement } from "./../base/constants";
import { ActionResultType, WhereParams } from "./../index.d";

export default function update(data: WhereParams): ActionResultType {
  return {
    stmtObject: {},
    type: SubStatement.WHERE,
    get stmt() { return ""; },
  };
}
