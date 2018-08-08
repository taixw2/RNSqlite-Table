import { ActionResultType } from "../index.d";

type InjectFuncType = (value: ActionResultType) => void;
type ActionFuncType = (...args: any[]) => ActionResultType;

export default function pack(target: ActionFuncType, ...fnappendToTarget: ActionFuncType[]) {
  return (...injectFuns: InjectFuncType[]) => {
    return (...targetParams: any[]) => {
      const targetResult: ActionResultType = target(...targetParams);
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
            const subActionResult: ActionResultType = currentValue(...args);
            const targetChildren = targetResult.children![subActionResult.type] || [];
            targetResult.children![subActionResult.type] = targetChildren.concat(subActionResult.stmtObject);
            return { ...actions, ...injectFunActions };
          },
        }),
        {},
      );
      return { ...actions, ...injectFunActions };
    };
  };
}
