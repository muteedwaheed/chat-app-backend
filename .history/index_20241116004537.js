const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
const messageRoutes = require("./routes/messages");
const userCrud = require("./routes/user-crud");
const app = express();
const socket = require("socket.io");
require("dotenv").config();

// app.use(cors());
app.use(cors({
  origin: '*', // Allow all origins
  credentials: true, // If needed, allows credentials like cookies
}));
app.use(express.json());

const Port = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL;
const CORSE_OPTIONS = process.env.CORSE_OPTIONS;

// const PORT = 5000;
// const MONGO_URL = "mongodb://127.0.0.1:27017/chat"

mongoose
  .connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connetion Successfull");
  })
  .catch((err) => {
    console.log(err.message);
  });


app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/", userCrud);

const server = app.listen(Port, () =>
  console.log(`Server started on ${Port}`)
);

const io = socket(server, {
  cors: {
    origin: '*',
    methods: ["GET", "POST"],
    // origin: CORSE_OPTIONS,
    credentials: true,
  },
});

global.onlineUsers = new Map();
io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-recieve", data.msg);
    }
  });
});

