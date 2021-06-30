const ViajePasajero = require("../Modelos/ViajePasajero.js");

const buscarViajePasajeroPorId = (req, res) => {
  const { id } = req.params;
  ViajePasajero.find({idPasajero:id}).populate({
    path: "idViaje",
    populate: [
      { path: "ruta",
        populate:[{path:"origen"},{path:"destino"}]
      }
    ]
    })
   .then((result) => { res.json(result)});
};

const agregarViajePasajero = (req, res) => {
  const dataViajePasajero = req.body;
  if (!dataViajePasajero) {
    return res.status(404).end();
  }
  const { idPasajero, idViaje } = dataViajePasajero;
  const nuevoViajePasajero = new ViajePasajero({
    cancelado:false,
    idPasajero,
    idViaje,
  });
  nuevoViajePasajero.save().then(resp => res.json(resp))
};

const modificarViajePasajero = (req,res) => {
  const { id } = req.params;
  ViajePasajero.findByIdAndUpdate(id,{cancelado:true},{new:true}).then(resp => res.json(resp))
}

const listarViajesPasajero = (req, res) => {
  ViajePasajero.find({}).populate({
      path: "idViaje",
      populate: [
        { path: "ruta",
          populate:[{path:"origen"},{path:"destino"}]
        }
      ]
     })
    .then((resp) => res.json(resp));
 };

//

module.exports = {
  buscarViajePasajeroPorId,
  agregarViajePasajero,
  listarViajesPasajero,
  modificarViajePasajero
};
