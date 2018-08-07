import { SubStatement } from '../base/constants';
import { ActionResultType, LimitParams } from '../index.d';

export default function limit(data: LimitParams): ActionResultType {
  return {
    type: SubStatement.LIMIT,
    stmt: {},
  }
}