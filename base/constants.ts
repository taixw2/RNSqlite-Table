import {
  SupStatementType,
  WriteActionType,
} from "../index.d";

export const SupStatement: {[key: string]: SupStatementType} = {
  INSERT: "insert",
};

export const WriteAction: { [key: string]: WriteActionType } = {
  ABORT: "ABORT",
  FAIL: "FAIL",
  IGNORE: "IGNORE",
  REPLACE: "REPLACE",
  ROLLBACK: "ROLLBACK",
};
