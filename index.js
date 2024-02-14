const express = require("express");
const http = require("http");
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
app.use("/api/user", userRoutes);

// Create HTTP server
const server = http.createServer(app);

// Socket.IO setup
const { initialize } = require("./utils/sockets/connectionManager");
require("./utils/sockets/privateMessage");

const io = initialize(server);

// Start the server
server.listen(process.env.PORT, () => {
  console.log(`Server running at ${process.env.PORT}`);
});
