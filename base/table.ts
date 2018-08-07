import { ActionResultType } from './../index.d';
import * as Const from "./constants";
import * as Type from "../index.d";
import { pack, insert, delete$, where, update, select, group, order, limit } from "../functions";
import merge from './merge';

function table() {
  const opeartorStore = {
    [Const.SupStatement.SELECT]: [],
    [Const.SupStatement.INSERT]: [],
    [Const.SupStatement.DELETE]: [],
    [Const.SupStatement.UPDATE]: [],
  }

  const actions = {
    insert(data: Type.InsertParams, action?: Type.WriteActionType) {
      return pack(insert)(end, query)
    },
    delete(data: Type.DeleteParams) {
      return pack(delete$, where)(end, query)
    },
    update(data: Type.UpdateParams, action?: Type.WriteActionType) {
      return pack(update, where)(end, query)
    },
    select(data: Type.SelectParams) {
      return pack(select, where, group, order, limit)(end, query)
    },
  }

  function query(result: ActionResultType) {
    if (opeartorStore[result.type][0] !== result) {
      end(result)
    }
    return merge(opeartorStore);
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
