import { IActionResultType } from "../index.d";
import { extension } from "../utils";

export function subStmtInfoGenarator(childrens: IActionResultType[]) {
  const subStmtInfos = childrens.map((children) => children.getStatementInfo());
  return {
    stmt: subStmtInfos.map((v) => v.stmt).join(" "),
    value: extension.flat(subStmtInfos.map((v) => v.value)),
  };
}
