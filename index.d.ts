export type BaseType   = string | number | boolean | null | void
export type HashAny    = { [key: string]: any }
export type HashObject = { [key: string]: BaseType }
export type HashString = { [key: string]: string }
export type None       = "BLOB";
export type Integer    = "INT" | "INTEGER" | "TINYINT" | "SMALLINT" | "MEDIUMINT" | "BIGINT" | "UNSIGNED BIG INT" | "INT2" | "INT8";
export type Text       = "CHARACTER" | "VARCHAR" | "VARYING CHARACTER" | "NCHAR" | "NATIVE CHARACTER" | "NVARCHAR" | "TEXT" | "CLOB";
export type Real       = "REAL" | "DOUBLE" | "DOUBLE PRECISION" | "FLOAT";
export type Numeric    = "NUMERIC" | "DECIMAL" | "BOOLEAN" | "DATE" | "DATETIME";

// query 返回的数据类型
export interface IQueryStmtType {
  stmt : string;
  value: BaseType[];
}

export interface IActionResultType {
  type            : string;
  data            : any;
  getStatementInfo: (table: string) => IQueryStmtType;
  children?       : { [key: string]: any[] }
}

export const SupStatement    : { [key: string]: SupStatementType }
export type SupStatementType = "insert"

export type InsertParams     = HashObject
export type WriteActionType  = "REPLACE" | "ROLLBACK" | "ABORT" | "FAIL" | "IGNORE"

interface TableInstance {
  insert: (data: InsertParams, action?: WriteActionType) => HashAny,
}

export type Table = (name: string) => TableInstance;
export default Table;


