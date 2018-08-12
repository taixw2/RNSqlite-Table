import Table, { Const } from "../index";
import { DeleteParams } from "../index.d";

describe("insert", () => {
  const user = Table("User");
  it("INSERT INTO `User` (`name`, `age`) VALUES ('Ou', 10)", () => {
    expect(user.insert({ name: "Ou", age: 10 }).query())
      .toEqual({ stmt: "INSERT INTO `User` (`name`,`age`) VALUES (?,?)", value: ["Ou", 10] });
  });

  it("INSERT INTO OR REPLACE `User` (`name`, `age`) VALUES ('Ou', 10)", () => {
    expect(user.insert({ name: "Ou", age: 10 }, Const.WriteAction.REPLACE).query())
      .toEqual({ stmt: "INSERT INTO OR REPLACE `User` (`name`,`age`) VALUES (?,?)", value: ["Ou", 10] });
  });

  it("INSERT INTO OR ABORT `User` (`name`, `age`) VALUES ('Ou', 10)", () => {
    expect(user.insert({ name: "Ou", age: 10 }, Const.WriteAction.ABORT).query())
      .toEqual({ stmt: "INSERT INTO OR ABORT `User` (`name`,`age`) VALUES (?,?)", value: ["Ou", 10] });
  });

  it("INSERT INTO OR ROLLBACK `User` (`name`, `age`) VALUES ('Ou', 10)", () => {
    expect(user.insert({ name: "Ou", age: 10 }, Const.WriteAction.ROLLBACK).query())
      .toEqual({ stmt: "INSERT INTO OR ROLLBACK `User` (`name`,`age`) VALUES (?,?)", value: ["Ou", 10] });
  });
});

describe("delete", () => {
  const user = Table("User");

  it("DELETE FROM `User` WHERE `name` = 'Ou'", () => {
    // normalStmt
    expect(user.delete({ name: "Ou", age: 10 }).query())
      .toEqual({ stmt: "DELETE FROM `User` WHERE `name` = ? AND `age` = ?", value: ["Ou", 10] });
  });

  it("DELETE FROM `User` WHERE name = 'Ou' OR name='Hu'", () => {
    // ORStmt
    expect(user.delete([{ name: "Ou" }, { name: "Hu" }]).query())
      .toEqual({ stmt: "DELETE FROM `User` WHERE `name` = ? OR `name` = ?", value: ["Ou", "Hu"] });
  });

  it("DELETE FROM `User` WHERE age < 10 AND name='Ou'", () => {
    // condition
    expect(user.delete({ age: [Const.ComparisonOpearetor.LT, 10] }).query())
      .toEqual({ stmt: "DELETE FROM `User` WHERE `age` < ?", value: [10] });
  });
});
