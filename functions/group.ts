import { SubStatement } from "./../base/constants";
import { ActionResultType, GroupParams } from "./../index.d";

export default function group(data: GroupParams): ActionResultType {
  return {
    stmtObject: {},
    type: SubStatement.GROUP,
    get stmt() { return ""; },
  };
}
