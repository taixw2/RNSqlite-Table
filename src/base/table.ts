import { IActionResultType, IQueryStmtType, Table } from "../../types/types";
import { delete$, group, insert, like, limit, order, select, update, where } from "../functions";
import { extension } from "./../utils";
import component from "./component";

type StoreType = Map<string, IActionResultType[]>;

/**
 * 初始化 Store
 * 入参：
 * initAction(query, end)
 * 返回
 * {
 *  select: { query, end, where ... },
 *  insert: { query, end },
 * ...
 * }
 *
 * @param {...Array<(result: IActionResultType) => void>} injectFns
 * @returns
 */
function initAction(...injectFns: Array<(result: IActionResultType) => void>) {
  return {
    /**
     * 入参：
     * 1. { age: 10 }
     * 2. { age: ["<", 10] }
     * 3. [{ age: 10 }, { age: 20 }]
     */
    delete: component(delete$)(...injectFns),
    /**
     * 入参：
     * 1. ({ a: 10, b: 20 })
     * 2. ({ a: 10, b: 20 }, REPLACE)
     * 3. ({ a: 10, b: 20 }, IGNORE)
     * ...
     */
    insert: component(insert)(...injectFns),
    /**
     * 入参:
     * 1. undefined
     * 2. ["name", "age"]
     * 3. [{ name: "nickName" }, "age"]
     * 4. { name: "nickName", age: "age" }
     */
    select: component(select, where, group, like, limit, order)(...injectFns),
    /**
     * 入参:
     * { name: "Ou", age: 10 }
     */
    update: component(update, where)(...injectFns),
  };
}

/**
 * 初始化 store
 * query 返回 store 中储存的语句， 并清空
 * 返回:
 * {
 *  getLate(type), // 获取该类型最新的语句对象
 *  add(value), // 将语句对象添加到 store 中
 *  values(), // 返回 store 中所有的 value
 *  clear(), // 清空 store
 * }
 *
 * @returns
 */
function initStore() {
  const store: StoreType = new Map();
  return {
    getLate(type: string) {
      const currentStore = store.get(type) || [];
      return extension.Array.last(currentStore);
    },
    add(value: IActionResultType) {
      const type = value.type;
      const currentStore = store.get(type);
      if (!currentStore) {
        store.set(type, [value]);
        return;
      }
      currentStore.push(value);
    },
    values() { return store.values(); },
    clear() { store.clear(); },
  };
}

export default (function table(name: string) {
  const store   = initStore();
  const actions = initAction(end, query);

  function _mergeStmtByStore() {
    return extension.Array.flat(Array.from(store.values())
      .map((value) => value.map((actionResule) => actionResule.getStatementInfo(name))));
  }

  /**
   * 调用 query 后执行该闭包
   * 合并 store 中的所有语句数据， 并返回语句
   * @param {IActionResultType} result 该操作返回的结果
   * @returns {(IQueryStmtType[] | IQueryStmtType)}
   */
  function query(result: IActionResultType): IQueryStmtType[] | IQueryStmtType {
    const queryType = result.type;
    if (store.getLate(queryType) !== result) {
      store.add(result);
    }
    // get statements
    const statements = _mergeStmtByStore();
    // clear store
    store.clear();
    return statements.length === 1 ? statements[0] : statements;
  }

  /**
   * 调用 end 后执行该闭包
   * 返回到顶级 action 如：
   * select().where({ name: 'Ou' }).end().insert({ name: 'Ha' }).end().update({ name: 'OuYang' }).where({ name: 'Ou' })
   *
   * @param {IActionResultType} result
   * @returns
   */
  function end(result: IActionResultType) {
    store.add(result);
    return { ...actions };
  }

  return { ...actions };
}) as Table;
