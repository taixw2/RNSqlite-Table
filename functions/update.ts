import { SupStatement } from "./../base/constants";
import { ActionResultType, UpdateParams } from "./../index.d";

export default function update(data: UpdateParams): ActionResultType {
  return {
    children: {},
    stmtObject: {},
    type: SupStatement.UPDATE,
    get stmt() { return ""; },
  };
}
