// const mongoDb = require("mongodb");

// const MongoClient = mongoDb.MongoClient;

// let _db;
// const mongoDB_URI = process.env.MongoDB_URI;

// const mongoConnect = (callback) => {
//   MongoClient.connect(mongoDB_URI)
//     .then((client) => {
//       console.log("Database connected successfully");
//       _db = client.db();
//       callback();
//     })
//     .catch((err) => {
//       console.log(err);
//       throw err;
//     });

// };

// const getDb = () => {
//   // console.log("getDb called");
//   if (_db) {
//     return _db;
//   }
//   throw "No database found..!";
// };

// exports.mongoConnect = mongoConnect;
// exports.getDb = getDb;

const mongoose = require("mongoose");

const mongoDB_URI = process.env.MongoDB_URI;

const dataBaseConnect = () => {
  mongoose
  .connect(mongoDB_URI)
  .then(console.log("Database connected"))
  .catch((err) => {
    console.log(err);
  });
}

  module.exports = dataBaseConnect;