require("dotenv").config();
const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const errorController = require("./controllers/error");
const dataBaseConnect = require("./util/database");
const User = require("./models/user");

const app = express();
dataBaseConnect();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));


app.use((req, res, next) => {
  User.findById("6725eea9d912e61732c5a8ac")
    .then((user) => {
      // console.log(user, "app user");
      if (!user) {
        throw new Error("User not found");
      }
      req.user = user;
      next();
    })
    .catch((err) => {
      console.log(err);
    });
});

User.findOne().then((user) => {
  if (!user) {
    const user = new User({
      name: "Arnav",
      email: "arnav@gmail.com",
      cart: {
        item: [],
      },
    });
    user.save();
  }
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

app.listen(8000);
