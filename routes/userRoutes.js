const express = require("express");
const { registerMe, login, registerPage, loginPage, privateChatPage } = require("../controller/userController");
const userRoutes = express.Router();


userRoutes.route("/register-me").get(registerPage).post(registerMe);
userRoutes.route("/login-me").get(loginPage).post(login);
userRoutes.route("/private").get(privateChatPage);


module.exports = userRoutes