require("dotenv").config();
const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const errorController = require("./controllers/error");
// const db = require('./util/database');
const { mongoConnect } = require("./util/database");
const User = require("./models/user");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use((req, res, next) => {
  User.findById('67209a76a3a09cb1a469a4b9')
    .then((user) => {
      console.log(user, "app user")
      req.user = user;
      next();
    })
    .catch((err) => {
      console.log(err);
    });
});

app.use(errorController.get404);

mongoConnect(() => {
  app.listen(3000);
});
