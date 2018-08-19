export type BaseType                = string | number | boolean | null | void
export type HashAny                 = { [key: string]: any }
export type HashObject              = { [key: string]: BaseType }
export type HashString              = { [key: string]: string }
export type None                    = "BLOB";
export type Integer                 = "INT" | "INTEGER" | "TINYINT" | "SMALLINT" | "MEDIUMINT" | "BIGINT" | "UNSIGNED BIG INT" | "INT2" | "INT8";
export type Text                    = "CHARACTER" | "VARCHAR" | "VARYING CHARACTER" | "NCHAR" | "NATIVE CHARACTER" | "NVARCHAR" | "TEXT" | "CLOB" | "CHAR";
export type Real                    = "REAL" | "DOUBLE" | "DOUBLE PRECISION" | "FLOAT";
export type Numeric                 = "NUMERIC" | "DECIMAL" | "BOOLEAN" | "DATE" | "DATETIME";
export type WriteActionType         = "REPLACE" | "ROLLBACK" | "ABORT" | "FAIL" | "IGNORE"
export type ConditionExpressionType = "=" | "!=" | "<" | ">" | ">=" | "<=" | "!<" | "!>"
export type ConditionParams = { [key: string]: [ConditionExpressionType, BaseType] | BaseType }
export type WhereParams  = HashObject | HashObject[] | ConditionParams | ConditionParams[]
export type InsertParams = HashObject
export type UpdateParams = HashObject
export type SelectParams = string | Array<string | HashString> | HashString
export type OrderParams  = string | Array<string | HashString>
export type DeleteParams = WhereParams
export type AlterParams = Alter.IRename | Alter.IAddColumn

export type DataType = None | Integer | Text | Real | Numeric

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

declare namespace Alter {
  export interface IRename {
    type: "rename"
    name: string
  }

  export interface IAddColumn {
    type: "addColumn",
    column: {
      name: string,
      type: DataType,
      length?: number
    }
  }
}

interface IInjectMethods {
  query: () => IQueryStmtType,
  end  : () => ITableInstance
}

interface IUpdateMthods extends IInjectMethods {
  where: (params: DeleteParams) => IInjectMethods
}

interface ISelectMethdos extends IInjectMethods {
  where: (params: WhereParams) => ISelectMethdos,
  having: () => ISelectMethdos,
  group: (params: string | string[]) => ISelectMethdos,
  order: (params: OrderParams) => ISelectMethdos,
  limit: (limitValue: number, offsetValue: number) => ISelectMethdos,
  like: (params: string) => ISelectMethdos,
}

interface ITableInstance {
  alter: (data: AlterParams) => IInjectMethods,
  insert: (data: InsertParams, action?: WriteActionType) => IInjectMethods,
  delete: (data: DeleteParams) => IInjectMethods,
  update: (data: UpdateParams, action?: WriteActionType) => IInjectMethods & IUpdateMthods,
  select: (data?: SelectParams) => ISelectMethdos,
}

export type Table = (name: string) => ITableInstance;


