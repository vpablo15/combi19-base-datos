const Lugar = require("../Modelos/Lugar.js");
const Ruta = require("../Modelos/Ruta.js");

const buscarLugarPorId = (req, res) => {
  const { id } = req.params;
  Lugar.findById(id).then((result) => {
    res.json(result);
  });
};

const agregarLugar = (req, res) => {
  const dataLugar = req.body;
  if (!dataLugar) {
    return res.status(404).end();
  }
  const { nombre, provincia } = dataLugar;
  const nuevoLugar = new Lugar({
    nombre,
    provincia,
    bajaL:false
  });
  nuevoLugar.save().then((result) => {
    console.log(result);
  });
};

const modificarLugar = async(req, res) => {
  const { id } = req.params;
  const lugarActualizado = req.body;
  if (!lugarActualizado) {
    res.status(404).end();
  }
  const rutasBajaL = await Ruta.find({bajaL:true})
    .populate("origen", { nombre: 1, provincia: 1, _id: 1 })
    .populate("destino", { nombre: 1, provincia: 1, _id: 1 })
    .populate("combi", {
      patente: 1,
      modelo: 1,
      cantidadDeAsientos: 1,
      chofer: 1,
      tipoDeCombi: 1,
      _id: 1
    })
  const buscado = rutasBajaL.filter(ruta => ruta.origen._id == id || ruta.destino._id == id)
  if(buscado[0] !== null){
    const nuevoLugar = new Lugar({
      ...lugarActualizado,
      bajaL:false
    })
    await nuevoLugar.save()
    Lugar.findByIdAndUpdate(id,{bajaL:true})
  }else{
    await Lugar.findByIdAndUpdate(id, lugarActualizado, { new: true })
  }
};

const borrarLugar = async (req, res) => {
  const { id } = req.params;
  const rutasBajaL = await Ruta.find({bajaL:true})
    .populate("origen", { nombre: 1, provincia: 1, _id: 1 })
    .populate("destino", { nombre: 1, provincia: 1, _id: 1 })
    .populate("combi", {
      patente: 1,
      modelo: 1,
      cantidadDeAsientos: 1,
      chofer: 1,
      tipoDeCombi: 1,
      _id: 1
    })
  const buscado = rutasBajaL.filter(ruta => ruta.origen._id == id || ruta.destino._id == id)
  console.log(buscado);
  if(buscado.length > 0){
    await Lugar.findByIdAndUpdate(id,{bajaL:true},{new:true})
  }else{
    await Lugar.findByIdAndRemove(id)
  }
};

const listarLugares = (req, res) => {
  Lugar.find({}).then((dataLugar) => {
    res.json(dataLugar);
  });
};

module.exports = {
  buscarLugarPorId,
  agregarLugar,
  modificarLugar,
  borrarLugar,
  listarLugares,
};
