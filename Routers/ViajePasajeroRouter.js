const router = require("express").Router();
const {
  buscarViajePasajeroPorId,
  agregarViajePasajero,
  listarViajesPasajero,
} = require("../Controladores/ViajePasajeroABM.js");

router.get("/:id", buscarViajePasajeroPorId);
router.post("/", agregarViajePasajero);
router.get("/", listarViajesPasajero);

module.exports = router;