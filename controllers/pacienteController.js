import Paciente from "../models/Paciente.js";

const newPaciente = async (req, res) => {
  const { veterinario } = req;
  try {
    const paciente = await Paciente.create({
      ...req.body,
      veterinario: veterinario._id,
    });

    return res.status(201).send({
      message: "Paciente creado con exito!",
      paciente,
    });
  } catch (error) {
    return res.status(400).send({
      message: error.message,
    });
  }
};
const getPacientes = async (req, res) => {
  const { veterinario } = req;
  try {
    const pacientes = await Paciente.find({
      veterinario: veterinario._id,
    });
    return res.status(200).send({
      message: "Pacientes asignados",
      pacientes,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      message: error.message,
    });
  }
};
const getPaciente = async (req, res) => {
  const { id } = req.params;
  try {
    const paciente = await Paciente.findById(id);

    if (!paciente) {
      throw new Error("no se encontro al paciente");
    }

    return res.status(200).send({
      message: "Pacientes encontrado!",
      paciente,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      message: error.message,
    });
  }
};
const updatePaciente = async (req, res) => {
  const { id } = req.params;
  //   const {nombre,} =  req.body;
  try {
    const paciente = await Paciente.findById(id);

    if (!paciente) {
      throw new Error("no se encontro al paciente");
    }
    const updatePaciente = await Paciente.findOneAndUpdate(
      { _id: id },
      {
        ...req.body,
      },
      {
        new: true,
      }
    );

    return res.status(200).send({
      message: "Paciente actualizado!",
      paciente: updatePaciente,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      message: error.message,
    });
  }
};
const deletePaciente = async (req, res) => {
  const { id } = req.params;
  try {
    const paciente = await Paciente.findOneAndDelete(id);

    if (!paciente) {
      throw new Error("no se encontro al paciente");
    }

    return res.status(200).send({
      message: "Paciente eliminado!",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      message: error.message,
    });
  }
};

export {
  newPaciente,
  getPacientes,
  getPaciente,
  deletePaciente,
  updatePaciente,
};
