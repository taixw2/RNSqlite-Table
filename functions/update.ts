import * as Const from "../base/constants";
import * as Helper from "../helper/statementHelper";
import { extension } from "../utils";
import { IActionResultType, UpdateParams, WriteActionType } from "./../index.d";

const keyRules = [Const.SubStatement.WHERE];

function generator(table: string, keys: string[], action: string) {
  return `UPDATE ${action}\`${table}\` SET ${keys.map((key) => `\`${key}\` = ?`).join(",")}`;
}

export default function update(data: UpdateParams, action?: WriteActionType): IActionResultType {
  const actionStr = action ? `OR ${action} ` : "";

  const result = {
    children: {},
    data: {},
    type: update.name,
    getStatementInfo(table: string) {
      if (extension.Object.isEmpty(result.children)) { throw new Error("缺少 where 子句"); }
      const stmt = generator(table, Object.keys(data), actionStr);
      const subStmtInfo = Helper.subStmtInfoGenarator(extension.Object.soryObject(result.children, keyRules));
      return { stmt: stmt + subStmtInfo.stmt, value: Object.values(data).concat(subStmtInfo.value) };
    },
  };

  return result as IActionResultType;
}
