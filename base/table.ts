import { ActionResultType } from './../index.d';
import * as Const from "./constants";
import merge from './merge';
import { pack, insert, delete$, where, update, select, group, order, limit } from "../functions";

function table() {
  const opeartorStore = {
    [Const.SupStatement.SELECT]: [],
    [Const.SupStatement.INSERT]: [],
    [Const.SupStatement.DELETE]: [],
    [Const.SupStatement.UPDATE]: [],
  }

  const actions = {
    insert: pack(insert)(end, query),
    delete: pack(delete$, where)(end, query),
    update: pack(update, where)(end, query),
    select: pack(select, where, group, order, limit)(end, query),
  }

  function _clearStore() {
    Object
    .keys(opeartorStore)
    .forEach(key => opeartorStore[key].length = 0)
  }

  function query(result: ActionResultType): string[] {
    if (opeartorStore[result.type][0] !== result) {
      end(result)
    }
    const statements = merge(opeartorStore);
    _clearStore()
    return statements;
  }

  function end(result: ActionResultType) {
    opeartorStore[result.type].unshift(result);
    return { ...actions }
  }
  return { ...actions }
}

export default table;

// // db.run(table.create())
// // db.run(table.select().where("a = 1").like("%2").groupBy("1, 2, 3").limit(1, 10).orderBy("a, b").desc())
// // db.run(table.insert("", type))
// // db.run(table.delete("id"))
// // db.run(table.update({a : 1}).where("a = 1"))
