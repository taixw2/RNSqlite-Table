import { IActionResultType, UpdateParams } from "./../index.d";

export default function update(data: UpdateParams): IActionResultType {
  return {
    children: {},
    data: {},
    type: update.name,
    getStatementInfo() { return { stmt: "", value: [] }; },
  };
}
