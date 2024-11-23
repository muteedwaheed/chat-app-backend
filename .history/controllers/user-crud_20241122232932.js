const User = require("../models/userModel");
const bcrypt = require("bcrypt");
exports.createUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.query;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username: name,
      email,
      password: hashedPassword,
    });
    return res.json({ status: true, user, msg: "user created successfully" });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
exports.readAllUsers = async (req, res, next) => {
  try {
    const findUser = await User.find();
    // console.log(findUser);
    return res.json({
      status: true,
      user: findUser,
      msg: "all users fetch successfully",
    });
  } catch (error) {
    next(error);
  }
};

exports.readSingleUsers = async (req, res, next) => {
  try {
    const { email } = req.query;
    const read = await User.findOne({ email: email });
    console.log(read);
    return res.json({
      status: true,
      user: read,
      msg: `user ${email} get successfully`,
    });
  } catch (error) {
    next(error);
  }
};
exports.updateUser = async (req, res, next) => {
  try {
    const { name, email } = req.query;
    const updateUser = await User.findOneAndUpdate(
      { username: name },
      { email: email },
      { new: true }
    );
    console.log(updateUser);
    return res.json({
      status: true,
      user: updateUser,
      msg: `user ${name} updated successfully`,
    });
  } catch (error) {
    next(error);
  }
};
exports.deleteUser = async (req, res, next) => {
  try {
    const { email } = req.query;
    const deleteUser = await User.findOneAndDelete({ email: email });
    console.log(deleteUser);
    return res.json({
      status: true,
      user: deleteUser,
      msg: `user ${name} deleted successfully`,
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteAll = async (req, res, next) => {
  try {
    const deleteAll = await User.deleteMany();
    return res.json({ status: true, user: deleteAll });
  } catch (error) {
    next(error);
  }
};
