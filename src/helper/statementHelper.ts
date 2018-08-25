import { IActionResultType } from "../../types/types";
import { extension } from "../utils/index";

export function subStmtInfoGenarator(childrens: IActionResultType[]) {
  const subStmtInfos = childrens.map((children) => children.getStatementInfo());
  return {
    stmt: subStmtInfos.map((v) => v.stmt).join(" ") || "",
    value: extension.Array.flat(subStmtInfos.map((v) => v.value)) || [],
  };
}
