import {
  ArithmeticOpearentorType,
  BitwiseOperatorsType,
  ComparisonOpearetorType,
  LogicalOperatorsType,
  SubStatementType,
  SupStatementType,
  WriteActionType,
} from "../index.d";

export const SupStatement: SupStatementType = {
  DELETE: "delete",
  INSERT: "insert",
  SELECT: "select",
  UPDATE: "update",
};

export const SubStatement: SubStatementType = {
  GROUP: "group",
  LIKE: "like",
  LIMIT: "limit",
  ORDER: "order",
  WHERE: "where",
};

export const ArithmeticOpearentor: ArithmeticOpearentorType = {
  ADD: "+",
  DIVISION: "/",
  MODULUS: "%",
  MULTIPLY: "*",
  SUBTRACTION: "-",
};

export const ComparisonOpearetor: ComparisonOpearetorType = {
  EQUAL: "=",
  GT: ">",
  GTEQUAL: ">=",
  LT: "<",
  LTEQUAL: "<=",
  NOGT: "!>",
  NOLT: "!<",
  NOTEQUAL: "!=",
};

export const LogicalOperators: LogicalOperatorsType = {
  AND: "AND",
  BETWEEN: "BETWEEN",
  EXISTS: "EXISTS",
  GLOB: "GLOB",
  IN: "IN",
  IS: "IS",
  ISNOT: "IS NOT",
  ISNULL: "IS NULL",
  LIKE: "LIKE",
  NOTIN: "NOT IN",
  OR: "OR",
  UNIQUE: "UNIQUE",
};

export const BitwiseOperators: BitwiseOperatorsType = {
  BOTH: "&",
  EITHER: "|",
  FILPPING: "~",
  LEFT: "<<",
  RIGHT: ">>",
};

export const WriteAction: WriteActionType = {
  ABORT: "ABORT",
  FAIL: "FAIL",
  IGNORE: "IGNORE",
  REPLACE: "REPLACE",
  ROLLBACK: "ROLLBACK",
};
