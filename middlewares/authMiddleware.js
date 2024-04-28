import jwt from "jsonwebtoken";
import User from "../models/User.js";

const protect = async (req, res, next) => {
  let token = "";

  try {
    token = req.cookies.jwt;
    console.log(token, "TOKEN RECIBIDO ");
    console.log(req.cookies, "COOKIE ");
    console.log(req, "REQUEST ");
    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_WEB_TOKEN_KEY);
      const user = await User.findById(decoded.id).select("-password");

      if (!user) {
        throw new Error("user not found");
      }

      req.user = user;
      next();
    } else {
      throw new Error("invalid token");
    }
  } catch (error) {
    console.log(error, "PROTECT ROUTE");
    return res.status(401).send({
      message: error.message,
    });
  }
};
const admin = async (req, res, next) => {
  try {
    if (req.user && req.user.isAdmin) {
      next();
    } else {
      throw new Error("user not valid for this request");
    }
  } catch (error) {
    console.log(error);
    return res.status(401).send({
      message: error.message,
    });
  }
};

export { protect, admin };
