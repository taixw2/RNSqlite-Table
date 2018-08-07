import { SupStatement } from './../base/constants';
import { UpdateParams, ActionResultType } from './../index.d';

export default function update(data: UpdateParams): ActionResultType {
  return {
    type: SupStatement.UPDATE,
    stmt: {},
    children: {}
  }
}