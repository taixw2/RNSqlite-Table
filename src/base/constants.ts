import { ConditionExpressionType, WriteActionType } from "./../index.d";

export const SubStatement = {
  GROUP: "GROUP",
  HAVING: "HAVING",
  LIKE: "LIKE",
  LIMIT: "LIMIT",
  OFFSET: "OFFSET",
  ORDER: "ORDER",
  WHERE: "WHERE",
};

export const WriteAction: { [key: string]: WriteActionType } = {
  ABORT: "ABORT",
  FAIL: "FAIL",
  IGNORE: "IGNORE",
  REPLACE: "REPLACE",
  ROLLBACK: "ROLLBACK",
};

export const ComparisonOpearetor: { [key: string]: ConditionExpressionType} = {
  EQUAL: "=",
  GT: ">",
  GTEQUAL: ">=",
  LT: "<",
  LTEQUAL: "<=",
  NOGT: "!>",
  NOLT: "!<",
  NOTEQUAL: "!=",
};

export const OrderType = {
  ASC: "ASC",
  DESC: "DESC",
};
