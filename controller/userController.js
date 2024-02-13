const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");

const registerMe = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: "all fields required!" });
  }
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("hashedPassword generated", hashedPassword);
    const newUser = await userModel.create({
      ...req.body,
      password: hashedPassword,
    });
    console.log("user created", newUser);
    return res.status(201).json({
      message: "user created successfully!",
      name: newUser.name,
      email: newUser.email,
    });
  } catch (error) {
    console.log("error at registerMe controller", error);
    return res
      .status(500)
      .json({ message: "internal server error", error: error });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "all fields are required!" });
  }
  try {
    const userToFind = await userModel.findOne({ email: email });
    if (!userToFind) {
      return res.status(404).json({ message: "invalid email or password" });
    }
    const comparePassword = await bcrypt.compare(password, userToFind.password);
    if (!comparePassword) {
      return res.status(404).json({ message: "invalid email or password" });
    }
    console.log(`${userToFind.email} login `);
    // return res.status(200).json({message: "user login successfully!", user: userToFind.name, email: userToFind.email})
    res.redirect("http://localhost:8080/api/user/private");
  } catch (error) {
    console.log("error occured at login controller", error);
    return res
      .status(500)
      .json({ message: "internal server error", error: error });
  }
};

const loginPage = (req, res) => {
  res.render("login");
};

const registerPage = (req, res) => {
  res.render("register");
};

const privateChatPage = (req, res) => {
  res.render("privateChat");
};

const getUsers = async (req, res) => {
  try {
    const users = await userModel.find({}); 
    res.json({ users });
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  registerMe,
  login,
  loginPage,
  registerPage,
  privateChatPage,
  getUsers,
};


// se5KiNFzm4iuaF-3AAAA
