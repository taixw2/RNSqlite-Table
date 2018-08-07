import {
  SubStatementType,
  SupStatementType,
  ArithmeticOpearentorType,
  ComparisonOpearetorType,
  LogicalOperatorsType,
  BitwiseOperatorsType,
  WriteActionType
} from "../index.d";

export const SupStatement: SupStatementType = {
  INSERT: "insert",
  SELECT: "select",
  UPDATE: "update",
  DELETE: "delete",
}

export const SubStatement: SubStatementType = {
  WHERE: "where",
  LIKE: "like",
  LIMIT: "limit",
  GROUP: "group",
  ORDER: "order",
}

export const ArithmeticOpearentor: ArithmeticOpearentorType = {
  ADD: "+",
  SUBTRACTION: "-",
  MULTIPLY: "*",
  DIVISION: "/",
  MODULUS: "%",
}

export const ComparisonOpearetor: ComparisonOpearetorType = {
  EQUAL: "=",
  NOTEQUAL: "!=",
  GT: ">",
  LT: "<",
  GTEQUAL: ">=",
  LTEQUAL: "<=",
  NOGT: "!>",
  NOLT: "!<"
}

export const LogicalOperators: LogicalOperatorsType = {
  AND: "AND",
  BETWEEN: "BETWEEN",
  EXISTS: "EXISTS",
  IN: "IN",
  NOTIN: "NOT IN",
  LIKE: "LIKE",
  GLOB: "GLOB",
  OR: "OR",
  ISNULL: "IS NULL",
  IS: "IS",
  ISNOT: "IS NOT",
  UNIQUE: "UNIQUE",
}

export const BitwiseOperators: BitwiseOperatorsType = {
  BOTH: "&",
  EITHER: "|",
  FILPPING: "~",
  LEFT: "<<",
  RIGHT: ">>",
}

export const WriteAction: WriteActionType = {
  REPLACE: "REPLACE",
  ROLLBACK: "ROLLBACK",
  FAIL: "FAIL",
  IGNORE: "IGNORE",
  ABORT: "ABORT",
}