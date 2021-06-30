const Pasajero = require("../Modelos/Pasajero.js");
const Tarjeta = require("../Modelos/Tarjeta")

const buscarPasajeroPorId = (req, res) => {
  const { id } = req.params;
  Pasajero.findById(id).then((result) => {
    res.json(result);
  });
};

const agregarPasajero = (req, res) => {
  const dataPasajero = req.body;
  if (!dataPasajero) {
    return res.status(404).end();
  }
  const { nombre, apellido, dni, mail, contraseña, fechaDeNacimiento, plan, tarjeta } = dataPasajero;
  if(plan){
    const nuevaTarjeta = new Tarjeta(tarjeta)
    nuevaTarjeta.save().then(res => {
      const nuevoPasajero = new Pasajero({
        nombre,
        apellido,
        dni,
        mail,
        contraseña,
        fechaDeNacimiento,
        plan,
        tarjeta:res._id,
      });
      nuevoPasajero.save()
    })
  }else{
    const nuevoPasajero = new Pasajero({
      nombre,
      apellido,
      dni,
      mail,
      contraseña,
      fechaDeNacimiento,
      plan,
    });
    nuevoPasajero.save()
  }
};

const modificarPasajero = async(req, res) => {
  const { id } = req.params;
  let pasajeroActualizado = req.body;
  if (!pasajeroActualizado) {
    res.status(404).end();
  }
  
  if(pasajeroActualizado.tarjeta !== undefined){
    if(pasajeroActualizado.tarjeta === null){
      const { tarjeta } = await Pasajero.findById(id)
      await Tarjeta.findByIdAndDelete(tarjeta)
    }else{
      const nuevaTarjeta = new Tarjeta({
        numero:pasajeroActualizado.tarjeta.numero,
        titular:pasajeroActualizado.tarjeta.titular,
        vencimiento:pasajeroActualizado.tarjeta.vencimiento,
        codigo:pasajeroActualizado.tarjeta.codigo
      })
      const { _id } = await nuevaTarjeta.save()
      pasajeroActualizado = {...pasajeroActualizado,tarjeta:_id}
    }
  }
  const result = await Pasajero.findByIdAndUpdate(id, pasajeroActualizado, { new: true })
  console.log('resultado:',result)
};

const borrarPasajero = (req, res) => {
  const { id } = req.params;
  Pasajero.findByIdAndRemove(id).then((result) => {
    console.log(result);
  });
};

const listarPasajeros = (req, res) => {
  Pasajero.find({}).populate("tarjeta",{
    numero:1,
    titular:1,
    vencimiento:1,
    codigo:1,
    id:1
  })
   .then((dataPasajero) => {
    res.json(dataPasajero);
  });
};

module.exports = {
  buscarPasajeroPorId,
  agregarPasajero,
  modificarPasajero,
  borrarPasajero,
  listarPasajeros,
}
