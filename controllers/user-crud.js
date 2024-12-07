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
    return res.json({ status: true, msg: "user created successfully", user });
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
      msg: "all users fetch successfully",
      user: findUser,
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
      msg: `user ${email} get successfully`,
      user: read,
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
    // console.log(updateUser);
    return res.json({
      status: true,
      msg: `user ${name} updated successfully`,
      user: updateUser,
    });
  } catch (error) {
    next(error);
  }
};
exports.deleteUser = async (req, res, next) => {
  try {
    const { email } = req.query;
    const deleteUser = await User.findOneAndDelete({ email: email });
    // console.log(deleteUser);
    return res.json({
      status: true,
      msg: `user ${email} deleted successfully`,
      user: deleteUser,
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteAll = async (req, res, next) => {
  try {
    const deleteAll = await User.deleteMany();
    return res.json({
      status: true,
      msg: "all users deleted successfully",
      user: deleteAll,
    });
  } catch (error) {
    next(error);
  }
};
// exports.readSig = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     // const { id } = req.query;
//     const findUser = await User.findById({
//       _id: id,
//     });
//     return res.json({
//       status: true,
//       msg: " users get successfully",
//       user: findUser,
//     });
//   } catch (error) {
//     next(error);
//   }
// };
