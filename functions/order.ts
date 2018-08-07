import { SubStatement } from '../base/constants';
import { ActionResultType, OrderParams } from '../index.d';

export default function order(data: OrderParams): ActionResultType {
  return {
    type: SubStatement.ORDER,
    stmt: {},
  }
}