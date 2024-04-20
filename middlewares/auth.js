import jwt from "jsonwebtoken";
import Veterinario from "../models/Veterinario.js";

const verificarToken = async (req, res, next) => {
  const token =
    req.headers.authorization && req.headers.authorization.split(" ")[1];

  if (!token) {
    return res.status(401).send({
      message: "no se ha enviado el token",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_WEB_TOKEN_KEY);
    console.log(decoded, "DECODED TOKEN");
    const veterinario = await Veterinario.findById(decoded.id).select(
      "-password -token -confirmado"
    );
    // const veterinario = await Veterinario.find(decoded.id).select(
    //   "-password -token -confirmado"
    // );
    console.log(veterinario, "VETARINARIO ENCONTRADO");

    req.veterinario = veterinario;
  } catch (error) {
    console.log(error);
    return res.status(401).send({
      message: "token no valido",
    });
  }
  next();
};

export { verificarToken };
