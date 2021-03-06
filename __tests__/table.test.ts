import Table, { Const } from "../src/index";

describe("insert", () => {
  const user = Table("User");
  it("INSERT INTO `User` (`name`, `age`) VALUES ('Ou', 10)", () => {
    expect(user.insert({ name: "Ou", age: 10 }).query())
      .toEqual({ stmt: "INSERT INTO `User` (`name`,`age`) VALUES (?,?)", value: ["Ou", 10] });
  });

  it("INSERT OR REPLACE INTO `User` (`name`, `age`) VALUES ('Ou', 10)", () => {
    expect(user.insert({ name: "Ou", age: 10 }, Const.WriteAction.REPLACE).query())
      .toEqual({ stmt: "INSERT OR REPLACE INTO `User` (`name`,`age`) VALUES (?,?)", value: ["Ou", 10] });
  });

  it("INSERT OR ABORT INTO `User` (`name`, `age`) VALUES ('Ou', 10)", () => {
    expect(user.insert({ name: "Ou", age: 10 }, Const.WriteAction.ABORT).query())
      .toEqual({ stmt: "INSERT OR ABORT INTO `User` (`name`,`age`) VALUES (?,?)", value: ["Ou", 10] });
  });

  it("INSERT OR ROLLBACK INTO `User` (`name`, `age`) VALUES ('Ou', 10)", () => {
    expect(user.insert({ name: "Ou", age: 10 }, Const.WriteAction.ROLLBACK).query())
      .toEqual({ stmt: "INSERT OR ROLLBACK INTO `User` (`name`,`age`) VALUES (?,?)", value: ["Ou", 10] });
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

describe("select", () => {
  const user = Table("User");

  it("SELECT * FROM User", () => {
    expect(user.select().query())
      .toEqual({ stmt: "SELECT * FROM User", value: [] });
  });

  it("SELECT name as nickName, age FROM User", () => {
    expect(user.select([{ name: "nickName" }, "age"]).query())
      .toEqual({ stmt: "SELECT name as nickName, age FROM User", value: [] });
  });

  it("SELECT name as nickName, age FROM User WHERE name = 'Ou'", () => {
    expect(
      user.select([{ name: "nickName" }, "age"])
        .where({ name: "Ou" })
        .group("name")
        .like("O_")
        .order([{ age: Const.OrderType.DESC, createTimestamp: Const.OrderType.ASC }, "name"])
        .limit(10, 0)
        .query(),
    )
      .toEqual({
        stmt: "SELECT name as nickName, age FROM User " +
          "WHERE `name` = ? " +
          "GROUP BY `name` " +
          "LIKE O_ ORDER BY age DESC, createTimestamp ASC, name " +
          "LIMIT 10 OFFSET 0",
        value: ["Ou"],
      });
  });

});

describe("alter", () => {
  const user = Table("COMPANY");

  it("ALTER TABLE COMPANY RENAME TO `OLD_COMPANY`", () => {
    expect(user.alter({ type: "rename", name: "OLD_COMPANY" }).query())
      .toEqual({ stmt: "ALTER TABLE COMPANY RENAME TO `OLD_COMPANY`", value: [] });
  });

  it("ALTER TABLE COMPANY ADD COLUMN `SEX` CHAR(1)", () => {
    expect(user.alter({ type: "addColumn", column: { name: "SEX", type: "CHAR", length: 1 } }).query())
      .toEqual({ stmt: "ALTER TABLE COMPANY ADD COLUMN `SEX` CHAR(1)", value: [] });
  });

  it("ALTER TABLE COMPANY ADD COLUMN `nick_name` TEXT", () => {
    expect(user.alter({ type: "addColumn", column: { name: "nick_name", type: "TEXT" } }).query())
      .toEqual({ stmt: "ALTER TABLE COMPANY ADD COLUMN `nick_name` TEXT", value: [] });
  });

});

describe("drop", () => {
  const user = Table("COMPANY");

  it("DROP TABLE COMPANY", () => {
    expect(user.drop().query())
      .toEqual({ stmt: "DROP TABLE COMPANY", value: [] });
  });

});
