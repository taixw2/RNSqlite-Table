import { SubStatement } from '../base/constants';
import { ActionResultType } from '../index.d';

export default function like(data: string): ActionResultType {
  return {
    type: SubStatement.LIKE,
    stmt: {},
  }
}