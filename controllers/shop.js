const mongoose = require("mongoose");

const Product = require("../models/product");
// const Cart = require("../models/cart");
const Order = require("../models/order");

exports.getProducts = (req, res, next) => {
  Product.find().then((products) => {
    // console.log(products, "getProducts");
    res.render("shop/product-list", {
      prods: products,
      pageTitle: "All Products",
      path: "/products",
    });
  });
};

exports.getProduct = (req, res, next) => {
  const productId = req.params.productId;
  // console.log(productId, "productId");
  Product.findById(productId)
    .then((product) => {
      res.render("shop/product-detail", {
        prods: product,
        pageTitle: product.title,
        path: "/products",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
exports.getIndex = (req, res, next) => {
  Product.find().then((products) => {
    res.render("shop/index", {
      prods: products,
      pageTitle: "Shop",
      path: "/",
    });
  });
};

exports.getCartProducts = (req, res, next) => {
  req.user
    .populate("cart.items.productId")
    .then((user) => {
      const products = user.cart.items;
      res.render("shop/cart", {
        path: "/cart",
        pageTitle: "Your Cart",
        products: products,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postCart = (req, res, next) => {
  // console.log(req, "req")
  const productId = req.body.productId;
  // console.log(productId, "product id in post cart");
  // Check if productId is valid
  if (!mongoose.Types.ObjectId.isValid(productId)) {
    console.log("Invalid product ID");
    return res.status(400).send("Invalid product ID");
  }

  Product.findById(productId)
    .then((product) => {
      console.log(product, "postcart product");
      if (!product) {
        console.log("Product not found");
        return res.status(404).send("Product not found");
      }
      return req.user.addToCart(product);
    })
    .then((result) => {
      // console.log(result, "post cart fn");
      res.redirect("/cart");
    });
};

exports.deleteCartProduct = (req, res, next) => {
  const productId = req.body.productId;
  req.user
    .deleteItemFromCart(productId)
    .then((result) => {
      console.log(result, "result");
      res.redirect("/cart");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postOrders = (req, res, next) => {
  req.user
    .populate("cart.items.productId")
    .then((user) => {
      const products = user.cart.items.map((i) => {
        return { quantity: i.quantity, product: i.productId };
      });
      const order = new Order({
        user: {
          name: req.user.name,
          userId: req.user,
        },
        products: products,
      });
      return order.save();
    })
    .then((result) => {
      res.redirect("/orders");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getOrder = (req, res, next) => {
  req.user
    .getOrders()
    .then((orders) => {
      console.log(orders, "orders");
      res.render("shop/orders", {
        path: "/orders",
        pageTitle: "Your Orders",
        orders: orders,
      });
    })
    .catch((err) => {
      console.errror(err);
    });
};

exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    path: "/checkout",
    pageTitle: "Checkout",
  });
};
