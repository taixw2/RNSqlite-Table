import { SupStatement } from "../base/constants";
import { ActionResultType, InsertParams, WriteActionType } from "./../index.d";

export default function insert(data: InsertParams, action?: WriteActionType): ActionResultType {
  // TODO: 逻辑处理

  return {
    children: {},
    stmtObject: { data },
    type: SupStatement.INSERT,
    get stmt() { return ""; },
  };
}
