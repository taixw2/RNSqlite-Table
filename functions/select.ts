import { IActionResultType, SelectParams } from "./../index.d";

export default function select(data: SelectParams): IActionResultType {
  return {
    children: {},
    data: { data },
    type: select.name,
    getStatementInfo() { return { stmt: "", value: [] }; },
  };
}
