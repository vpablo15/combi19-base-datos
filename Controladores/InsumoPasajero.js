const InsumoPasajero = require("../Modelos/InsumoPasajero.js");

const agregarInsumoPasajero = (req, res) => {
  const dataInsumoPasajero = req.body;
  if (!dataInsumoPasajero) {
    return res.status(404).end();
  }
  const { id_pasajero, id_insumo, cantidad } = dataInsumoPasajero;
  const nuevoInsumoPasajero = new InsumoPasajero({
    id_pasajero,
    id_insumo,
    cantidad,
  });
  nuevoInsumoPasajero.save().then((result) => {
    console.log(result);
  });
};

module.exports = {
  agregarInsumo,
};