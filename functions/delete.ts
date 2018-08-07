import { DeleteParams, ActionResultType } from './../index.d';
import { SupStatement } from '../base/constants';

export default function delete$(data: DeleteParams): ActionResultType {
  // TODO: 逻辑处理
  return {
    type: SupStatement.DELETE,
    stmt: { data },
    children: {}
  }
}


