const express = require("express");
const cors = require("cors");
require("dotenv").config();

const userRoutes = require("./routes/userRoutes");

const app = express();

const socket = require("socket.io");

const mongoose = require("mongoose");

const chatModel = require("./models/chatModel");

const bodyparser = require("body-parser");
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

app.use(express.static("public"));

const url = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.ka5h8ls.mongodb.net/?retryWrites=true&w=majority`;
mongoose
  .connect(url)
  .then(() => {
    console.log("Database Connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(
  cors({
    origin: "*",
  })
);

app.use("/user", userRoutes);

const PORT = 6000;
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const io = socket(server);

io.on("connection", (socket) => {
  console.log("New User connected");

  socket.on("message", async (data) => {
    try {
      const obj = {
        sender: data.sender,
        content: data.content,
        receiver: data.receiver,
      };
      const message = new chatModel(obj);
      const mess=message.save();
      io.emit("message", mess);
    } catch (err) {
      console.error(err);
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});
