import { BaseType, ConditionExpressionType, IActionResultType, IQueryStmtType, WhereParams } from "../../types/types";
import * as Const from "../base/constants";
import { extension } from "./../utils";

function paramsParse(data: WhereParams): Array<{[key: string]: [ConditionExpressionType, BaseType]}> {
  if (Array.isArray(data)) { return extension.Array.flat((data as any[]).map(paramsParse)); }
  if (extension.Object.isPlainObject(data)) {
    const unitData = Object.entries(data)
    .reduce(
      (_, [key, value]) => {
        function getValue() {
          return Array.isArray(value) ? value : [Const.ComparisonOpearetor.EQUAL, value];
        }
        return { ..._, [key] : getValue() };
      },
      {},
    );
    return [unitData];
  }
  return [];
}

export default function where(data: WhereParams): IActionResultType {
  const dataParsed = paramsParse(data);
  return {
    data: {},
    type: Const.SubStatement.WHERE,
    getStatementInfo() {
      return dataParsed.reduce(
        (prevValue, currentValue) => {
          // 前置语句
          function getPreprationStmt() {
            return extension.Object.isEmpty(prevValue) ? " WHERE " : `${prevValue.stmt} OR `;
          }
          // 剩余的语句
          function getPostpostionStmt() {
            return Object.entries(currentValue).map(([key, value]) => `\`${key}\` ${value[0]} ?`).join(" AND ");
          }
          function getValue() {
            return (prevValue.value || []).concat(Object.values(currentValue).map(([_, value]) => value));
          }

          return {
            stmt: getPreprationStmt() + getPostpostionStmt(),
            value: getValue(),
          };
        },
        {},
      ) as IQueryStmtType;
    },
  };
}
