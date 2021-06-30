const router = require("express").Router();
const {
  buscarViajePasajeroPorId,
  agregarViajePasajero,
  listarViajesPasajero,
  modificarViajePasajero
} = require("../Controladores/ViajePasajeroABM.js");

router.get("/:id", buscarViajePasajeroPorId);
router.put("/:id", modificarViajePasajero);
router.post("/", agregarViajePasajero);
router.get("/", listarViajesPasajero);

module.exports = router;