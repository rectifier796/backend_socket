const userModel = require("../models/userModel");

module.exports = {
  create: async (req, res) => {
    try {
      const { name, phone, email } = req.body;

      const checkUser = await userModel.findOne({ email: req.body.email });

      if (checkUser) {
        return res
          .status(400)
          .send({ success: false, message: "Email Already Exist" });
      }

      if (!name || !phone || !email) {
        return res.status(400).json({
          success: false,
          Error: "All Inputs are Required",
        });
      }
      const user = new userModel({
        name,
        email,
        phone,
        image: "/images/" + req.file.filename,
      });
      const data = await user.save();
      res.status(200).json(data);
    } catch (err) {
      res.status(500).json({
        success: false,
        Error: err.message,
      });
    }
  },
  get: async (req, res) => {
    try {
      const users = await userModel.find();
      res.status(200).json({
        success: true,
        data: users,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        Error: err.message,
      });
    }
  },
  update: async (req, res) => {
    try {
      var user_id = req.body.user_id;

      var obj;

      if (req.file !== undefined) {
        obj = {
          name: req.body.name,
          email: req.body.email,
          phone: req.body.phone,
          image: "/images/" + req.file.filename,
        };
      } else {
        obj = {
          name: req.body.name,
          email: req.body.email,
          phone: req.body.phone,
        };
      }

      var updatedData = await userModel.findByIdAndUpdate(
        { _id: user_id },
        { $set: obj },
        { new: true }
      );

      res.status(200).send({
        success: true,
        message: "User Updated Successfully",
        data: updatedData,
      });
    } catch (err) {
      res.status(400).json({
        success: false,
        Error: err.message,
      });
    }
  },
};
