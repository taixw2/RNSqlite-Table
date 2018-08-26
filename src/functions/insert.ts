import { IActionResultType, InsertParams, WriteActionType } from "../../types/types";

function InsertGenerator(table: string, columns: string, values: string, action: string) {
  return `INSERT ${action}INTO \`${table}\` (${columns}) VALUES (${values})`;
}

export default function insert(data: InsertParams, action?: WriteActionType): IActionResultType {
  const keys = Object.keys(data);
  const values = Object.values(data);
  const columnsStr = keys.map((column) => `\`${column}\``).join(",");
  const valuesStr = keys.map((_) => "?").join(",");
  const actionStr = action ? `OR ${action} ` : "";

  return {
    children: {},
    data: null,
    type: insert.name,
    getStatementInfo(table?: string) {
      return {
        stmt: InsertGenerator(table!, columnsStr, valuesStr, actionStr),
        value: values,
      };
    },
  };
}
