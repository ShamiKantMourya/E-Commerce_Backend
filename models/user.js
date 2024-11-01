const mongoDb = require("mongodb");

const getDb = require("../util/database").getDb;

class User {
  constructor(userName, email, cart, id) {
    (this.name = userName),
      (this.email = email),
      (this.cart = cart),
      (this._id = id);
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
  addToCart(product) {
    const cartProductIndex = this.cart.items.findIndex((cp) => {
      return cp.productId.toString() === product._id.toString();
    });
    let newQuantity = 1;
    const updatedCartItems = [...this.cart.items];

    if (cartProductIndex >= 0) {
      newQuantity = this.cart.items[cartProductIndex].quantity + 1;
      updatedCartItems[cartProductIndex].quantity = newQuantity;
    } else {
      updatedCartItems.push({
        productId: new mongoDb.ObjectId(product._id),
        quantity: newQuantity,
      });
    }
    const updatedCart = {
      items: updatedCartItems,
    };
    const db = getDb();
    return db
      .collection("users")
      .updateOne(
        { _id: new mongoDb.ObjectId(this._id) },
        { $set: { cart: updatedCart } }
      );
  }
  getCart() {
    const db = getDb();
    const productIds = this.cart.items.map((item) => {
      return item.productId;
    });
    return db
      .collection("products")
      .find({ _id: { $in: productIds } })
      .toArray()
      .then((products) => {
        return products.map((p) => {
          return {
            ...p,
            quantity: this.cart.items.find((id) => {
              return id.productId.toString() === p._id.toString();
            }).quantity,
          };
        });
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
