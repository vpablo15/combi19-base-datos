const Viaje = require("../Modelos/Viaje.js");

const buscarViajePorId = (req, res) => {
  const { id } = req.params;
  Viaje.findById(id).then((result) => {
    res.json(result);
  });
};

const agregarViaje = (req, res) => {
  const dataViaje = req.body;
  if (!dataViaje) {
    return res.status(404).end();
  }
  const nuevoViaje = new Viaje({
    ...dataViaje,
    bajaL:false
  });
  nuevoViaje.save().then((result) => {
    console.log(result);
  });
};

const modificarViaje = (req, res) => {
  const { id } = req.params;
  const viajeActualizado = req.body;
  if (!viajeActualizado) {
    return res.status(404).end();
  }
  Viaje.findByIdAndUpdate(id, viajeActualizado, { new: true }).then(res => console.log('dato modificado',res))
};

const borrarViaje = async (req, res) => {
  const { id } = req.params;
  const pasados = await Viaje.find({estado:2})
  const buscado = pasados.filter(each => each.id === id)
  if(pasados.length > 0){
    console.log("baja logica")
    await Viaje.findByIdAndUpdate(id,{bajaL:true}, { new: true }) 
  }else{
    console.log('baja normal')
    await Viaje.findByIdAndDelete(id)
  }
};

const listarViajes = (req, res) => {
  Viaje.find({bajaL:false})
    .populate({
      path: "ruta",
      populate: [{ path: "origen" }, { path: "destino" },{ path: "combi" }],
    })
    .then((dataViajes) => {
      res.json(dataViajes);
    });
};

module.exports = {
  buscarViajePorId,
  agregarViaje,
  modificarViaje,
  borrarViaje,
  listarViajes,
};
