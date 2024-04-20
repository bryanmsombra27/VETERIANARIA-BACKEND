import nodemailer from "nodemailer";

const emailRegistro = async ({ nombre, email, token }) => {
  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.USER_EMAIL_HOST,
      pass: process.env.USER_EMAIL_PASS,
    },
  });
  const info = await transport.sendMail({
    from: "APV - ADMINISTRADOR DE PACIENTES DE VETERINARIA",
    to: email,
    subject: "Comprueba tu cuenta",
    text: "comprueba tu cuenta en apv",
    html: `
    <h1>Confirma tu Correo ${nombre} para comenzar con tu cuenta en APV</h1>
    <p>da click en el enlace para comprobar tu cuenta y comenzar a trabajar ✈ </p>
    
    <a href="${process.env.FRONTEND_URL}/confirmar/${token}" target="_blank">Confirmar cuenta</a>
    `,
  });
  console.log(info.messageId, "CORREO CONFIRMADO");
};

const recuperarContra = async (email, token) => {
  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.USER_EMAIL_HOST,
      pass: process.env.USER_EMAIL_PASS,
    },
  });
  const info = await transport.sendMail({
    from: "APV - ADMINISTRADOR DE PACIENTES DE VETERINARIA",
    to: email,
    subject: "Cambia contraseña",
    text: "Recupera el acceso de tu cuenta",
    html: `
    <h1>Instrucciones</h1>
    <p>da click en el enlace para comprobar tu cuenta y cambiar tu password </p>
    
    <a href="${process.env.FRONTEND_URL}/forget-password/${token}" target="_blank">Confirmar token </a>
    `,
  });
  console.log(info.messageId, "CORREO CONFIRMADO");
};

export { emailRegistro, recuperarContra };
