import { IActionResultType } from "../../types/types";

export default function drop(): IActionResultType {
  return {
    children: {},
    data: null,
    type: drop.name,
    getStatementInfo(table) {
      return {
        stmt: `DROP TABLE ${table}`,
        value: [],
      };
    },
  };
}
