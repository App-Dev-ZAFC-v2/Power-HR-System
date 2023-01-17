import mongoose from "mongoose";
import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();

export const getUserByID = async (id, res) => {
  try {
    const user = await User.findById(id);
    hashedPassword = user.password;
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getUsernameByID = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ message: "User doesn't exist" });
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Incorrect password!" });
    const UserId = user._id;
    const userType = user.userType;
    let model;
    userType === 0
      ? (model = "Applicant")
      : userType === 1
      ? (model = "Admin")
      : (model = "Employee");
    const userObject = await mongoose.model(model).findOne({ user: UserId });
    const detailId = userObject._id;
    const token = jwt.sign(
      { UserId, userType, detailId },
      process.env.JWT_SECRET
    );
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const registerUser = async (
  username,
  rawpassword,
  confirmPassword,
  userType,
  res,
  role
) => {
  try {
    const user = await User.findOne({ username });
    if (user) {
      res.status(400).json({ message: "Username already exists" });
      return;
    }
    if (rawpassword !== confirmPassword) {
      res.status(400).json({ message: "Passwords don't match" });
      return;
    }
    const hashedPassword = await bcrypt.hash(rawpassword, 12);
    // if role is true, set userType to 3 (executive)
    if (role) {
      userType = 3;
    }
    const newUser = new User({ username, password: hashedPassword, userType });
    await newUser.save();
    return newUser;
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

// export const registerUser = async (
//   username,
//   rawpassword,
//   confirmPassword,
//   userType,
//   res,
//   role
// ) => {
//   try {
//     const user = await User.findOne({ username });
//     if (user) {
//       res.status(400).json({ message: "Username already exists" });
//       return;

//     }
//     if (rawpassword !== confirmPassword) {
//       res.status(400).json({ message: "Passwords don't match" });
//       return;
//     }

export const deleteUser = async (id, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send(`No user with id: ${id}`);
    await User.findByIdAndRemove(id);
    res.json({ message: "User deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

//patch request to change username
export const changeUsername = async (req, res) => {
  try {
    const { id } = req.params;
    const { username } = req.body;
    const user = await User.findById(id);
    const updated = await User.findByIdAndUpdate(
      req.params.id,
      { username },
      { new: true }
    );
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const changePassword = async (req, res) => {
  try {
    const { id } = req.params;
    const { oldpassword, newpassword } = req.body;
    const user = await User.findById(id);
    const isPasswordCorrect = await bcrypt.compare(oldpassword, user.password);

    if (!isPasswordCorrect) {
      res.status(400).json({ message: "Incorrect password!" });
      return;
    }
    const hashedPassword = await bcrypt.hash(newpassword, 12);
    const updated = await User.findByIdAndUpdate(
      req.params.id,
      { password: hashedPassword },
      { new: true }
    );
    res.status(200).json(updated);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong with changing pasword" });
  }
};
