import { DeleteParams, IActionResultType } from "./../index.d";

export default function delete$(data: DeleteParams): IActionResultType {
  return {
    children: {},
    data: null,
    type: delete$.name,
    getStatementInfo() { return { stmt: "", value: [] }; },
  };
}
