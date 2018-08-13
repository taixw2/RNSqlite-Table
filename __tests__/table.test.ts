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

describe("update", () => {
  const user = Table("User");

  it("UPDATE `User` SET name='Ou' where id = 0", () => {
    expect(user.update({ name: "Ou" }).where({ id: 0 }).query())
      .toEqual({ stmt: "UPDATE `User` SET `name` = ? WHERE `id` = ?", value: ["Ou", 0] });
  });

  it("UPDATE OR REPLACE `User` SET name='Ou' where id = 0", () => {
    expect(user.update({ name: "Ou" }, Const.WriteAction.REPLACE).where({ id: 0 }).query())
      .toEqual({ stmt: "UPDATE OR REPLACE `User` SET `name` = ? WHERE `id` = ?", value: ["Ou", 0] });
  });

  it("UPDATE OR ABORT `User` SET name='Ou' where id = 0", () => {
    expect(user.update({ name: "Ou" }, Const.WriteAction.ABORT).where({ id: 0 }).query())
      .toEqual({ stmt: "UPDATE OR ABORT `User` SET `name` = ? WHERE `id` = ?", value: ["Ou", 0] });
  });

  it("UPDATE OR ROLLBACK `User` SET name='Ou' where id = 0", () => {
    expect(user.update({ name: "Ou" }, Const.WriteAction.ROLLBACK).where({ id: 0 }).query())
      .toEqual({ stmt: "UPDATE OR ROLLBACK `User` SET `name` = ? WHERE `id` = ?", value: ["Ou", 0] });
  });
});
