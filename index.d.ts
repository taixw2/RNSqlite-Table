export type BaseType = string | number | boolean | null | void
export type HashObject = { [key: string]: BaseType }
export type HashString = { [key: string]: string }
export type Integer = "INT" | "INTEGER" | "TINYINT" | "SMALLINT" | "MEDIUMINT" | "BIGINT" | "UNSIGNED BIG INT" | "INT2" | "INT8";
export type Text = "CHARACTER" | "VARCHAR" | "VARYING CHARACTER" | "NCHAR" | "NATIVE CHARACTER" | "NVARCHAR" | "TEXT" | "CLOB";
export type None = "BLOB";
export type Real = "REAL" | "DOUBLE" | "DOUBLE PRECISION" | "FLOAT";
export type Numeric = "NUMERIC" | "DECIMAL" | "BOOLEAN" | "DATE" | "DATETIME";
export type TableColumnType = {
  type: Integer | Text | None | Real | Numeric;
  defaultValue?: string | number;
  optional?: boolean;
  primaryKey?: boolean;
  unique?: boolean;
  check?: string;
}

export type WriteActionType = {
  REPLACE: string,
  ROLLBACK: string,
  ABORT: string,
  FAIL: string,
  IGNORE: string,
}

export type ActionResultType = {
  type: string,
  stmt: any,
  children?: { [key: string]: any[] }
}

export const SupStatementType:  SupStatementType
export type SupStatementType = {
  INSERT: string,
  SELECT: string,
  UPDATE: string,
  DELETE: string,
}

export type SubStatementType = {
  WHERE: string,
  LIKE: string,
  LIMIT: string,
  GROUP: string,
  ORDER: string,
}

export type StatementType = SupStatementType | SubStatementType

export const ArithmeticOpearentor: ArithmeticOpearentorType
export type ArithmeticOpearentorType = {
  ADD: string,
  SUBTRACTION: string,
  MULTIPLY: string,
  DIVISION: string,
  MODULUS: string,
}

export const ComparisonOpearetor: ComparisonOpearetorType
export type ComparisonOpearetorType = {
  EQUAL: string,
  NOTEQUAL: string,
  GT: string,
  LT: string,
  GTEQUAL: string,
  LTEQUAL: string,
  NOGT: string,
  NOLT: string
}

export const LogicalOperators: LogicalOperatorsType
export type LogicalOperatorsType = {
  AND: string,
  BETWEEN: string,
  EXISTS: string,
  IN: string,
  NOTIN: string,
  LIKE: string,
  GLOB: string,
  OR: string,
  ISNULL: string,
  IS: string,
  ISNOT: string,
  UNIQUE: string,
}

export const BitwiseOperators: BitwiseOperatorsType
export type BitwiseOperatorsType = {
  BOTH: string,
  EITHER: string,
  FILPPING: string,
  LEFT: string,
  RIGHT: string,
}

export type ConditionExpressionType = { [key: string]: [ComparisonOpearetorType, BaseType] }

// SupStmt
export type InsertParams = string | HashObject
export type DeleteParams = string | HashObject
export type UpdateParams = string | HashObject
export type SelectParams = string | Array<string | HashString> | HashString

// SubStmt
export type WhereParams = string | Array<ConditionExpressionType | HashObject>
export type GroupParams = string | string[]
export type OrderParams = string | string[] | Array<[string, "DESC" | "ASC"]>
export type LimitParams = number | [number, number]

export type TableColumnStructure = { [key: string]: TableColumnType }

interface TableStatic {
  new(name: string, structure: TableColumnStructure): TableInstance;
}

interface TableInstance {
  name: string;
  structure: TableColumnStructure;

  create(): TableStatic
  select(): TableStatic
  where(): TableStatic
  like(): TableStatic
  group(): TableStatic
  limit(): TableStatic
  order(): TableStatic
  insert(): TableStatic
  delete(): TableStatic
  update(): TableStatic
  sql(): string
}

export type Table = TableStatic;
export default Table;
