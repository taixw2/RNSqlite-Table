import Table, { Const } from "../index";

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
