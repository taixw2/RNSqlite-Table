# RNSqlite-Table
使用声明式编写 sql， 基于 andpor/react-native-sqlite-storage

## Examples

### insert
``` typescript
// stmt: "INSERT INTO `user` (`name`, `age`) VALUES ('Ou', 10)",
const user = Table("user");
user.insert({ name: "Ou", age: 10 })
// output
// {
//    statement:  "INSERT INTO `user` (`name`, `age`) VALUES (?, ?)",
//    values: ["Ou", 10]
// }
```

### delete
``` typescript
// stmt: "DELETE FROM `user` WHERE age = 10"
const user = Table("user");
user.delete({ age: 10 })
// output
// {
//    statement:  "DELETE FROM `user` WHERE age = ?",
//    values: [10]
// }
```

### update
``` typescript
// stmt: "UPDATE `user` SET `age`=10 WHERE `name` ='Ou'"
const user = Table("user");
user.update({ age: 10 }).where({ name: 'Ou' })
// output
// {
//    statement:  "UPDATE `user` SET WHERE `name` =?",
//    values: ['Ou']
// }
```

### select
``` typescript
// stmt: "SELECT name as nickName, age FROM `user` WHERE name = 'Ou'"
import Table from "RNSqlite-Table"
const user = Table("user");
user.select([{ name: 'nickName' }, 'age']).where({ name = 'Ou' })
// output
// {
//    statement:  SELECT name as nickName, age FROM `user` WHERE name = ?,
//    values: ['Ou']
// }
```

### where
``` typescript
// stmt: "SELECT * FROM `user` WHERE name = 'Ou' AND age = 10 OR name = 'H' AND age = 11"
import Table, { Const } from "RNSqlite-Table"
const user = Table("user");
user.select().where([{ name: 'Ou', age: 10 }, { name: 'H', age: 11 }])
user.select().where([
  { name: [Const.ComparisonOpearetor.EQUAL, 'Ou'], age: [Const.ComparisonOpearetor.EQUAL, 10] },
  { name: ["=", 'H'], age: ["=", 11] }
])
// output
// {
//    statement:  "SELECT * FROM `user` WHERE name = ? AND age = ? OR name = ? AND age = ?",
//    values: ['Ou', 10, 'H', 11]
// }
