const express = require("express");

const userRoutes = express();

const bodyparser = require("body-parser");
userRoutes.use(bodyparser.json());
userRoutes.use(bodyparser.urlencoded({ extended: true }));

userRoutes.use(express.static("public"));

const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(
      null,
      path.join(__dirname, "../public/images"),
      function (error, success) {
        if (error) {
          console.log(error);
        }
      }
    );
  },
  filename: function (req, file, cb) {
    const name = Date.now() + "-" + file.originalname;
    cb(null, name, function (error, success) {
      if (error) {
        console.log(error);
      }
    });
  },
});

const upload = multer({ storage: storage });

const userController = require("../controllers/userController");

userRoutes.get("/getUsers", userController.get);

userRoutes.post("/addUser", upload.single("image"), userController.create);

userRoutes.put("/updateUser", upload.single("image"), userController.update);

module.exports = userRoutes;
