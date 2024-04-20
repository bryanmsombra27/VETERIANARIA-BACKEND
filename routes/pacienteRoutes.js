import { Router } from "express";
import {
  deletePaciente,
  getPaciente,
  getPacientes,
  newPaciente,
  updatePaciente,
} from "../controllers/pacienteController.js";
import { verificarToken } from "../middlewares/auth.js";

const router = Router();

router.post("/", verificarToken, newPaciente);
router.get("/", verificarToken, getPacientes);
router.get("/:id", verificarToken, getPaciente);
router.put("/:id", verificarToken, updatePaciente);
router.delete("/:id", verificarToken, deletePaciente);

export default router;
