import { IActionResultType, IQueryStmtType, Table  } from "./../index.d";
import { flat, last } from "./../utils/extension";

type StoreType = Map<string, IActionResultType[]>;

/**
 * 初始化 Store
 * 入参：
 * initAction(query, end)
 * 返回
 * {
 *  select : { query, end, where ... },
 *  insert: { query, end },
 * ...
 * }
 *
 * @param {...Array<(result: IActionResultType) => void>} injectFn
 * @returns
 */
function initAction(...injectFn: Array<(result: IActionResultType) => void>) {
  return {};
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
      return last(currentStore);
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
  const store = initStore();
  const actions = initAction(end, query);

  /**
   * 调用 query 后执行该闭包
   * 合并 store 中的所有语句数据， 并返回语句
   * @param {IActionResultType} result 该操作返回的结果
   * @returns {(IQueryStmtType[] | IQueryStmtType)}
   */
  function query(result: IActionResultType): IQueryStmtType[] | IQueryStmtType {
    const queryType = result.type;
    if (store.getLate(queryType) !== result) { store.add(result); }
    const statements = flat(Array.from(store.values())
      .map((value) => value.map((actionResule) => actionResule.getStatementInfo(name))));
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
