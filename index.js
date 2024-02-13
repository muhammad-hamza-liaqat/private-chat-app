const express = require("express");
const app = express();
require("dotenv").config();
const bodyParser = require("body-parser");
const cors = require("cors");
require("./database/connection"); // database connection

// view templates
app.set('view engine', 'pug');
app.set('views', './views');


// middlewares
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
const userRoutes = require("./routes/userRoutes");
app.use("/api/user",userRoutes);



// server
app.listen(process.env.PORT, () => {
  console.log(`server running at ${process.env.PORT}`);
});
