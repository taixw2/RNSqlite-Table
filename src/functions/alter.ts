
import { Alter, AlterParams, IActionResultType } from "../../types/types";

function isRename(data: AlterParams): data is Alter.IRename  {
  return data.type === "rename";
}

function add(data: Alter.IAddColumn) {
  const { length, type, name } = data.column;
  const lengthStatement = length ? `(${length})` : "";
  return `ADD COLUMN \`${name}\` ${type}${lengthStatement}`;
}

function rename(data: string) {
  return `RENAME TO \`${data}\``;
}

function getOperation(data: AlterParams) {
  if (isRename(data)) {
    return rename(data.name);
  }
  return add(data);
}

function getPrefix(table: string) {
  return `ALTER TABLE ${table} `;
}

export default function alter(data: AlterParams): IActionResultType {
  const operationStateemt = getOperation(data);
  return {
    children: {},
    data: null,
    type: alter.name,
    getStatementInfo(table) {
      return {
        stmt: `${getPrefix(table!)}${operationStateemt}`,
        value: [],
      };
    },
  };
}
