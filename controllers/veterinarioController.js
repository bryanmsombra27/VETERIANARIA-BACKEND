import generarId from "../helpers/generarId.js";
import { generarToken } from "../helpers/jwt.js";
import { emailRegistro, recuperarContra } from "../helpers/sendEmails.js";
import Veterinario from "../models/Veterinario.js";

const registrar = async (req, res) => {
  const { email, password, nombre } = req.body;
  try {
    const findUser = await Veterinario.findOne({
      email,
    });

    if (findUser) {
      throw new Error("usuario ya fue registrado");
    }

    const veterinario = await Veterinario.create({
      email,
      password,
      nombre,
    });
    emailRegistro({
      nombre: veterinario.nombre,
      email: veterinario.email,
      token: veterinario.token,
    });

    return res.status(201).send({
      message: "usuario registrado con exito",
      veterinario,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      message: error.message,
    });
  }
};
const perfil = async (req, res) => {
  const { veterinario } = req;

  return res.status(200).send({
    message: "perfil de usuario",
    perfil: veterinario,
  });
};

const updatePerfil = async (req, res) => {
  const { veterinario } = req;

  try {
    const updatePaciente = await Veterinario.findOneAndUpdate(
      { _id: veterinario._id },
      {
        ...req.body,
      },
      {
        new: true,
      }
    );

    return res.status(200).send({
      message: "perfil de usuario actualizado con exito!",
      perfil: updatePaciente,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      message: error.message,
    });
  }
};

const confirmar = async (req, res) => {
  const { token } = req.params;

  try {
    const findUser = await Veterinario.findOne({
      token,
    });

    if (!findUser) {
      throw new Error("el token no es valido");
    }
    await Veterinario.findOneAndUpdate(
      { token },
      { confirmado: true, token: null },
      {
        new: true,
      }
    );
    return res.status(200).send({
      message: "Usuario confirmado con exito!",
    });
  } catch (error) {
    console.log(error);
    return res.status(404).send({
      message: error.message,
    });
  }
};
const autenticar = async (req, res) => {
  const { email, password } = req.body;

  try {
    const findUser = await Veterinario.findOne({
      email,
      confirmado: true,
    });

    if (!findUser) {
      throw new Error("El usuario no existe o no se ha confirmado su cuenta");
    }

    if (!(await findUser.comprobarPassword(password))) {
      throw new Error("El usuario o la contraseña son incorrectos");
    }

    const token = generarToken({ id: findUser.id });

    return res.status(200).send({
      message: "Usuario logueado con exito!",
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(401).send({
      message: error.message,
    });
  }
};
const verifyEmail = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await Veterinario.findOne({
      email,
      confirmado: true,
    });

    if (!user) {
      throw new Error("correo no valido");
    }
    const token = generarToken({ id: user.id });

    recuperarContra(email, token);
    user.token = token;
    await user.save();

    return res.status(200).send({
      message: "Se ha enviado un correo con las instrucciones",
    });
  } catch (error) {
    console.log(error);
    return res.status(401).send({
      message: error.message,
    });
  }
};
const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;
  try {
    const user = await Veterinario.findOne({
      token,
      confirmado: true,
    });

    if (!user) {
      throw new Error("token no valido");
    }
    user.password = password;
    user.token = null;
    await user.save();

    return res.status(200).send({
      message: "password actualizada con exito!",
    });
  } catch (error) {
    console.log(error);
    return res.status(401).send({
      message: error.message,
    });
  }
};
const comprobarToken = async (req, res) => {
  const { token } = req.params;
  try {
    const user = await Veterinario.findOne({
      token,
      confirmado: true,
    });

    if (!user) {
      throw new Error("token no valido");
    }

    return res.status(200).send({
      message: "token confirmado",
    });
  } catch (error) {
    console.log(error);
    return res.status(401).send({
      message: error.message,
    });
  }
};

const updatePassword = async (req, res) => {
  const { veterinario } = req;
  const { password, newPassword } = req.body;
  try {
    const findUser = await Veterinario.findOne({
      _id: veterinario._id,
    });

    if (!(await findUser.comprobarPassword(password))) {
      throw new Error("La contraseña no es valida");
    }

    findUser.password = newPassword;
    await findUser.save();

    return res.status(200).send({
      message: "password actualizada con exito!",
    });
  } catch (error) {
    return res.status(401).send({
      message: error.message,
    });
  }
};

export {
  registrar,
  perfil,
  confirmar,
  autenticar,
  verifyEmail,
  resetPassword,
  comprobarToken,
  updatePerfil,
  updatePassword,
};
