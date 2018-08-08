import { SupStatement } from "./../base/constants";
import { ActionResultType, SelectParams } from "./../index.d";

export default function select(column: SelectParams): ActionResultType {
  return {
    children: {},
    stmtObject: {},
    type: SupStatement.SELECT,
    get stmt() { return ""; },
  };
}
