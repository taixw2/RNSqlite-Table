import { SupStatement } from "../base/constants";
import { ActionResultType, DeleteParams } from "./../index.d";

export default function delete$(data: DeleteParams): ActionResultType {
  // TODO: 逻辑处理
  return {
    children: {},
    stmtObject: { data },
    type: SupStatement.DELETE,
    get stmt() { return ""; },
  };
}
