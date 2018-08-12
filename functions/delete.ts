import { DeleteParams, IActionResultType } from "./../index.d";
import where from "./where";

export default function delete$(data: DeleteParams): IActionResultType {
  const whereStmt = where(data);
  return {
    children: {},
    data: null,
    type: delete$.name,
    getStatementInfo(table) {
      const preFix = `DELETE FROM \`${table}\``;
      const stmtInfo = whereStmt.getStatementInfo(table);
      return {
        ...stmtInfo,
        stmt: preFix + stmtInfo.stmt,
      };
    },
  };
}
