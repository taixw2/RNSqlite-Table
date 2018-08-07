import { SupStatement } from './../base/constants';
import { SelectParams, ActionResultType } from './../index.d';

export default function select(column: SelectParams): ActionResultType {
  return {
    type: SupStatement.SELECT,
    stmt: {},
    children: {}
  }
}
