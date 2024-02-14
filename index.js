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
const initializeSocket = require("./utils/sockets/sockets");

const { io, sendPrivateMessage } = initializeSocket(server);

// Add event listeners for private messaging
io.on('connection', (socket) => {
    socket.on('private_message', ({ senderID, recipientID, message }) => {
        sendPrivateMessage(senderID, recipientID, message);
    });
});

// Start the server
server.listen(process.env.PORT, () => {
    console.log(`Server running at ${process.env.PORT}`);
});
