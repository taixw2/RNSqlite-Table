import * as Const from "../base/constants";
import * as Helper from "../helper/statementHelper";
import { extension } from "../utils";
import { IActionResultType, SelectParams } from "./../index.d";

const sortRult = [
  Const.SubStatement.WHERE,
  Const.SubStatement.GROUP,
  Const.SubStatement.HAVING,
  Const.SubStatement.ORDER,
  Const.SubStatement.LIMIT,
  Const.SubStatement.OFFSET,
];

function getColumnStatement(data?: SelectParams): string {
  if (!data) { return "*"; }
  if (extension.String.isString(data)) { return data as string; }
  if (extension.Object.isPlainObject(data)) {
    return Object.entries(data).map((column) => `${column[0]} as ${column[1]}`).join(", ");
  }
  if (Array.isArray(data)) {
    return data.map(getColumnStatement).join(", ");
  }
  throw new Error("请输入合适的参数");
}

function generator(table: string, column: string) {
  return `SELECT ${column} FROM ${table}`;
}

export default function select(data?: SelectParams): IActionResultType {
  const columnStatement = getColumnStatement(data);
  const result = {
    children: {},
    data: { data },
    type: select.name,
    getStatementInfo(table?: string) {
      const statement = generator(table!, columnStatement);
      const subStmtInfo = Helper.subStmtInfoGenarator(extension.Object.soryObject(result.children, sortRult));
      return {
        stmt: statement + subStmtInfo.stmt,
        value: subStmtInfo.value,
      };
    },
  };
  return result;
}
