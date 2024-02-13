const express = require("express");
const { registerMe, login } = require("../controller/userController");
const userRoutes = express.Router();


userRoutes.route("/register-me").post(registerMe);
userRoutes.route("/login-me").post(login);


module.exports = userRoutes