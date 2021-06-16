 const router = require("express").Router();
 const { buscarTarjetaPorId, agregarTarjeta, modificarTarjeta, borrarTarjeta 
} = require("../Controladores/TarjetaABM")

 router.get("/:id", buscarTarjetaPorId);
 router.post("/", agregarTarjeta);
 router.put("/:id", modificarTarjeta);
 router.delete("/:id", borrarTarjeta);

 module.exports = router;