const mongoDb = require("mongodb");

const MongoClient = mongoDb.MongoClient;

let _db;

const mongoConnect = (callback) => {
  MongoClient.connect(
    "mongodb+srv://ShamiMourya:Arnav9852@cluster.ytoyh.mongodb.net/shop?retryWrites=true&w=majority&appName=Cluster"
  )
    .then((client) => {
      console.log("Database connected successfully");
      _db = client.db();
      callback();
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

const getDb = () => {
if(_db){
  return _db
}
throw "No database found..!"
}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
