import { WriteActionType, ActionResultType, InsertParams } from './../index.d';
import { SupStatement } from '../base/constants';

export default function insert(data: InsertParams, action?: WriteActionType): ActionResultType {
  // TODO: 逻辑处理

  return {
    type: SupStatement.INSERT,
    stmt: { data },
    children: {}
  }
}


