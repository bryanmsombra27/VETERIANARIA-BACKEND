import { Router } from "express";
import {
  autenticar,
  comprobarToken,
  confirmar,
  perfil,
  registrar,
  resetPassword,
  updatePassword,
  updatePerfil,
  verifyEmail,
} from "../controllers/veterinarioController.js";
import { verificarToken } from "../middlewares/auth.js";

const router = Router();

router.post("/", registrar);
router.get("/confirmar/:token", confirmar);
router.post("/login", autenticar);
router.get("/perfil", verificarToken, perfil);
router.put("/perfil", verificarToken, updatePerfil);
router.put("/password", verificarToken, updatePassword);
router.get("/reset/:token", comprobarToken);
router.post("/reset/:token", resetPassword);
router.post("/reset", verifyEmail);

export default router;
