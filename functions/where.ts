import { SubStatement } from './../base/constants';
import { ActionResultType, WhereParams } from './../index.d';

export default function update(data: WhereParams): ActionResultType {
  return {
    type: SubStatement.WHERE,
    stmt: {},
  }
}