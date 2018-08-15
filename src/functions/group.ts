import { IActionResultType } from "../../types/types";
import * as Const from "../base/constants";
import { extension } from "../utils";

function generator(data: string | string[]): string {
  if (extension.String.isString(data)) {
    return generator((data as string).split(","));
  }
  return (data as string[]).map((field) => `\`${field}\``).join(",");
}

export default function group(data: string | string[]): IActionResultType {
  const statement = "GROUP BY " + generator(data);
  return {
    data: {},
    type: Const.SubStatement.GROUP,
    getStatementInfo() { return { stmt: statement, value: [] }; },
  };
}
