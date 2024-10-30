const mongoDb = require("mongodb");

const getDb = require("../util/database").getDb;

class User {
  constructor(userName, email) {
    (this.name = userName), (this.email = email);
  }

  save() {
    const db = getDb();
    return db
      .collection("users")
      .insertOne(this)
      .then((user) => {
        console.log(user, "user");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static findById(userId) {
    // console.log(userId, "userId");
    const db = getDb();
    return db
      .collection("users")
      .findOne({ _id: new mongoDb.ObjectId(userId) })
      .then((user) => {
        console.log(user, "user");
        return user;
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

module.exports = User;