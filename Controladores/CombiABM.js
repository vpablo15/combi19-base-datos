const Combi = require("../Modelos/Combi.js");

const buscarCombiPorId = (req, res) => {
  const { id } = req.params;
  Combi.findById(id).then((result) => {
    res.json(result);
  });
};

const agregarCombi = (req, res) => {
  const dataCombi = req.body;
  if (!dataCombi) {
    return res.status(404).end();
  }
  const {
    patente,
    modelo,
    cantidadDeAsientos,
    chofer,
    tipoDeCombi,
  } = dataCombi;
  const nuevaCombi = new Combi({
    patente,
    modelo,
    cantidadDeAsientos,
    chofer,
    tipoDeCombi,
    bajaL:false
  });
  nuevaCombi.save().then((result) => {
    console.log(result);
  });
};

const modificarCombi = (req, res) => {
  const { id } = req.params;
  const combiActualizada = req.body;
  if (!combiActualizada) {
    res.status(404).end();
  }
  if(combiActualizada.bajaL === true){
    const nuevaCombi = new Combi({
      ...combiActualizada,
      bajaL:false,
    })
    nuevaCombi.save().then(res => console.log('modificada:',res))
    Combi.findByIdAndUpdate(id,combiActualizada,{new:true}).then(res => console.log(res))
  }else{
    Combi.findByIdAndUpdate(id, combi, { new: true }).then((result) => {
      console.log(result);
    });
  }
};

const borrarCombi = async(req, res) => {
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
  const rutaBuscada = rutasBajaL.filter(ruta => ruta._id === id)
  if(rutaBuscada[0] !== null){
    await Combi.findByIdAndUpdate(id,{bajaL:true})
  }else{
    await Combi.findByIdAndRemove(id);    
  }
}


const listarCombis = (req, res) => {
  Combi.find({bajaL:false})
    .populate("chofer", {
      nombre: 1,
      apellido: 1,
      mail: 1,
      direccion: 1,
      numeroDeContacto: 1,
      contraseña: 1,
      _id: 1,
    })
    .then((dataCombis) => {
      res.json(dataCombis);
    });
};

module.exports = {
  buscarCombiPorId,
  agregarCombi,
  modificarCombi,
  borrarCombi,
  listarCombis,
};
