const express = require("express");

const authController = require("../controllers/auth");

const router = express.Router();

//Login route
router.get("/login", authController.getLogin);

//Signup Route
router.get('/signup', authController.getSignup);

//User login route
router.post("/login", authController.postLogin);

//User logout route
router.post('/logout', authController.postLogout);

//User signup route
router.post('/signup', authController.postSignup);

module.exports = router;
