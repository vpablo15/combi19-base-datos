const router = require("express").Router();
const { agregarInsumoPasajero } = require("../Controladores/InsumoPasajeroABM.js");

router.post("/", agregarInsumoPasajero);

module.exports = router;
