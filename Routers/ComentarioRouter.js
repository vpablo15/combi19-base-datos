const router = require("express").Router();
const {
  buscarComentarioPorId,
  agregarComentario,
  modificarComentario,
  borrarComentario,
  listarComentarios,
} = require("../Controladores/ComentarioABM.js");

router.get("/:id", buscarComentarioPorId);
router.post("/", agregarComentario);
router.put("/:id", modificarComentario);
router.delete("/:id", borrarComentario);
router.get("/", listarComentarios);

module.exports = router;