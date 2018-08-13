import { IActionResultType } from "../index.d";

type InjectFuncType = (value: IActionResultType) => void;
type ActionFuncType = (...args: any[]) => IActionResultType;

/**
 * component 组合方法
 * component(select, where, having, order, group)(query)
 * action: {
 *  where() {},
 *  having() {},
 *  order() {},
 *  group() {},
 *  query() { query(select()) }
 * }
 *
 * @export
 * @param {ActionFuncType} target
 * @param {...ActionFuncType[]} fnappendToTarget
 * @returns
 */
export default function component(target: ActionFuncType, ...fnappendToTarget: ActionFuncType[]) {
  return (...injectFuns: InjectFuncType[]) => {
    return (...targetParams: any[]) => {
      const targetResult: IActionResultType = target(...targetParams);
      const injectFunActions = injectFuns.reduce(
        (prevValue, currentValue) => ({
          ...prevValue,
          [currentValue.name]: () => currentValue(targetResult),
        }),
        {},
      );
      const actions = fnappendToTarget.reduce(
        (prevValue, currentValue) => ({
          ...prevValue,
          [currentValue.name]: (...args: any[]) => {
            const subActionResult: IActionResultType = currentValue(...args);
            targetResult.children![subActionResult.type] = subActionResult;
            return { ...actions, ...injectFunActions };
          },
        }),
        {},
      );
      return { ...actions, ...injectFunActions };
    };
  };
}
