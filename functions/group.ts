import { SubStatement } from './../base/constants';
import { ActionResultType, GroupParams } from './../index.d';

export default function group(data: GroupParams): ActionResultType {
  return {
    type: SubStatement.GROUP,
    stmt: {},
  }
}