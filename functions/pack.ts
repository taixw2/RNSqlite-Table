import { ActionResultType } from './../index.d';

export default function pack(target: Function, ...fnappendToTarget: Function[]) {
  return (...injectFuns: Function[]) => {
    return (...targetParams: any[]) => {
      const targetResult: ActionResultType = target(...targetParams);
      const injectFunActions = injectFuns.reduce(
        (prevValue, currentValue) => ({
          ...prevValue,
          [currentValue.name]: () => currentValue(targetResult)
        }),
        {}
      )
      const actions = fnappendToTarget.reduce(
        (prevValue, currentValue) => ({
          ...prevValue,
          [currentValue.name]: (...args: any[]) => {
            const subActionResult: ActionResultType = currentValue(...args)
            const targetChildren = targetResult.children![subActionResult.type] || []
            targetResult.children![subActionResult.type] = targetChildren.concat(subActionResult.stmt)
            return { ...actions, ...injectFunActions }
          }
        }),
        {}
      )
      return { ...actions, ...injectFunActions }
    }
  }

}
