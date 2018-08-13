export type BaseType                = string | number | boolean | null | void
export type HashAny                 = { [key: string]: any }
export type HashObject              = { [key: string]: BaseType }
export type HashString              = { [key: string]: string }
export type None                    = "BLOB";
export type Integer                 = "INT" | "INTEGER" | "TINYINT" | "SMALLINT" | "MEDIUMINT" | "BIGINT" | "UNSIGNED BIG INT" | "INT2" | "INT8";
export type Text                    = "CHARACTER" | "VARCHAR" | "VARYING CHARACTER" | "NCHAR" | "NATIVE CHARACTER" | "NVARCHAR" | "TEXT" | "CLOB";
export type Real                    = "REAL" | "DOUBLE" | "DOUBLE PRECISION" | "FLOAT";
export type Numeric                 = "NUMERIC" | "DECIMAL" | "BOOLEAN" | "DATE" | "DATETIME";
export type WriteActionType         = "REPLACE" | "ROLLBACK" | "ABORT" | "FAIL" | "IGNORE"
export type ConditionExpressionType = "=" | "!=" | "<" | ">" | ">=" | "<=" | "!<" | "!>"

// query 返回的数据类型
export interface IQueryStmtType {
  stmt : string;
  value: BaseType[];
}

export interface IActionResultType {
  type            : string;
  data            : any;
  getStatementInfo: (table?: string) => IQueryStmtType;
  children?       : { [key: string]: IActionResultType }
}

export type ConditionParams = { [key: string]: [ConditionExpressionType, BaseType] | BaseType }

export type WhereParams  = HashObject | HashObject[] | ConditionParams | ConditionParams[]
export type InsertParams = HashObject
export type UpdateParams = HashObject
export type SelectParams = Array<string | HashString> | HashString
export type OrderParams  = string | Array<string | [string, string]>
export type DeleteParams = WhereParams

export type WhereStatement  = { where(params: DeleteParams): IInjectMethods }
export type HavingStatement = { having(): IInjectMethods }
export type GroupStatement  = { group(params: string | string[]): IInjectMethods }
export type OrderStatement  = { order(params: WhereParams): IInjectMethods }
export type LimitStatement  = { limit(params: number): IInjectMethods }
export type OffsetStatement = { offset(params: number): IInjectMethods }
export type LikeStatement   = { like(params: string): IInjectMethods }


interface IInjectMethods {
  query: () => IQueryStmtType,
  end  : () => ITableInstance
}

interface ITableInstance {
  insert: (data: InsertParams, action?: WriteActionType) => IInjectMethods,
  delete: (data: DeleteParams) => IInjectMethods,
  update: (data: UpdateParams, action?: WriteActionType) => IInjectMethods & WhereStatement,
  select: (data: SelectParams) => IInjectMethods & WhereStatement & GroupStatement & HavingStatement & GroupStatement & OrderStatement & LimitStatement & OffsetStatement,
}

export type Table = (name: string) => ITableInstance;
export default Table;


