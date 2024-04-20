import jwt from "jsonwebtoken";

const generarToken = (data) => {
  const token = jwt.sign(data, process.env.JWT_WEB_TOKEN_KEY, {
    expiresIn: "1d",
  });
  return token;
};

export { generarToken };
