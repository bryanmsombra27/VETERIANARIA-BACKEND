import User from "../models/User.js";
import jwt from "jsonwebtoken";
import { generateTokenAndCookie } from "../utils/generateToken.js";

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const findUser = await User.findOne({
      email,
    });

    if (!findUser) {
      throw new Error("user not found");
    }
    if (!findUser.matchPassword(password)) {
      throw new Error("invalid email or password");
    }

    await generateTokenAndCookie(res, findUser);

    return res.status(200).send({
      message: "user log in successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(404).send({
      message: error.message,
    });
  }
};
const getUsers = async (req, res) => {
  try {
    const users = await User.find();

    return res.status(200).send({
      message: "Users found",
      users,
    });
  } catch (error) {
    console.log(error);
    return res.status(404).send({
      message: error.message,
    });
  }
};
const logoutUser = async (req, res) => {
  try {
    res.cookie("jwt", "", {
      httpOnly: true,
      expires: new Date(0),
    });

    return res.status(200).send({
      message: "Logout successfully ",
    });
  } catch (error) {
    console.log(error);
    return res.status(404).send({
      message: error.message,
    });
  }
};
const createUsers = async (req, res) => {
  try {
    const userFound = await User.findOne({
      email: req.body.email,
    });

    if (userFound) {
      throw new Error("User already exists");
    }

    const user = await User.create(req.body);

    await generateTokenAndCookie(res, user);

    return res.status(200).send({
      message: "user create successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      message: error.message,
    });
  }
};
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");

    if (!user) {
      throw new Error("User not found");
    }

    return res.status(200).send({
      message: "user found",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      message: error.message,
    });
  }
};

const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    user.name = req.body.name || req.user.name;
    user.email = req.body.email || req.user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }
    const updateUser = await user.save();
    return res.status(200).send({
      message: "user update successfully",
      user: {
        _id: updateUser._id,
        name: updateUser.name,
        email: updateUser.email,
        isAdmin: updateUser.isAdmin,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      message: error.message,
    });
  }
};
export {
  login,
  getUsers,
  logoutUser,
  createUsers,
  getUserProfile,
  updateUserProfile,
};
