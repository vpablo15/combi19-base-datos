const Tarjeta = require("../Modelos/Tarjeta.js");

const buscarTarjetaPorId = (req, res) => {
  const { id } = req.params;
  Tarjeta.findById(id).then((result) => {
    res.json(result);
  });
};

const agregarTarjeta = (req, res) => {
  const dataTarjeta = req.body;
  if (!dataTarjeta) {
    return res.status(404).end();
  }
  const { numero, titular, vencimiento, codigo } = dataTarjeta;
  const nuevaTarjeta = new Tarjeta({
    numero,
    titular,
    vencimiento,
    codigo
  });
  nuevaTarjeta.save().then((result) => {
    console.log(result);
  });
};

const modificarTarjeta = (req, res) => {
    const { id } = req.params;
    const tarjetaActualizada = req.body;
    if (!tarjetaActualizada) {
      res.status(404).end();
    }
    console.log('id',id)
    Tarjeta.findByIdAndUpdate(id, tarjetaActualizada, { new: true }).then((result) => {
      console.log('resultado',result);
    });
  };
 
 const borrarTarjeta = (req, res) => {
     const { id } = req.params;
     Tarjeta.findByIdAndRemove(id).then((result) => {
         console.log(result);
     });
 };

module.exports = {
  buscarTarjetaPorId,
  agregarTarjeta,
  modificarTarjeta,
  borrarTarjeta,
};
