const Ruta = require("../Modelos/Ruta.js");
const Viaje = require("../Modelos/Viaje.js");
const buscarRutaPorId = (req, res) => {
  const { id } = req.params;
  Ruta.findById(id).then((result) => {
    res.json(result);
  });
};

const agregarRuta = (req, res) => {
  const dataRuta = req.body;
  if (!dataRuta) {
    return res.status(404).end();
  }
  const { origen, destino, combi, horario, kilometros } = dataRuta;
  const nuevaRuta = new Ruta({
    origen,
    destino,
    combi,
    horario,
    kilometros,
    bajaL:false
  });
  nuevaRuta.save().then((result) => {
    console.log(result);
  });
};

const modificarRuta = (req, res) => {
  const { id } = req.params;
  const rutaActualizada = req.body;
  if (!rutaActualizada) {
    res.status(404).end();
  }
  if(rutaActualizada.bajaL === true){
    const nuevaRuta = new Ruta({
      ...rutaActualizada,
      bajaL:false
    })
    nuevaRuta.save()//Ruta nueva de la baja logica
    Ruta.findByIdAndUpdate(id,rutaActualizada,{new:true})//Ruta puesta en baja logica
  }else{
    Ruta.findByIdAndUpdate(id, rutaActualizada, { new: true }).then((result) => {
      console.log(result);
    });
  }
};

const borrarRuta = async (req, res) => {
  const { id } = req.params;
  const buscado = await Viaje.find({ruta:id})
  //Baja logica
  if(buscado.length > 0){
    await Ruta.findByIdAndUpdate(id,{bajaL:true},{new:true})
  }else{
    await Ruta.findByIdAndRemove(id)
  }
};

const listarRutas = (req, res) => {
  Ruta.find({bajaL:false})
    .populate("origen", { nombre: 1, provincia: 1, _id: 1 })
    .populate("destino", { nombre: 1, provincia: 1, _id: 1 })
    .populate("combi", {
      patente: 1,
      modelo: 1,
      cantidadDeAsientos: 1,
      chofer: 1,
      tipoDeCombi: 1,
      _id: 1,
    })
    .then((dataRutas) => {
      res.json(dataRutas);
    });
};

module.exports = {
  buscarRutaPorId,
  agregarRuta,
  modificarRuta,
  borrarRuta,
  listarRutas,
};
