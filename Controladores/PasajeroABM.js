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
  const { nombre, apellido, dni, mail, contraseña, fechaDeNacimiento, plan, tarjeta } =
    dataPasajero;
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
        viajes:[]
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
      viajes:[]
    });
    nuevoPasajero.save()
  }
};

const modificarPasajero = (req, res) => {
  const { id } = req.params;
  const pasajeroActualizado = req.body;
  if (!pasajeroActualizado) {
    res.status(404).end();
  }
  const { nombre, apellido, dni, mail, contraseña, fechaDeNacimiento, plan, tarjeta } = pasajeroActualizado;
  const pasajero = {
    nombre,
    apellido,
    dni,
    mail,
    contraseña,
    fechaDeNacimiento,
    plan,
    tarjeta,
  };
  Pasajero.findByIdAndUpdate(id, pasajero, { new: true }).then((result) => {
    console.log(result);
  });
};

const borrarPasajero = (req, res) => {
  const { id } = req.params;
  Pasajero.findByIdAndRemove(id).then((result) => {
    console.log(result);
  });
};

const listarPasajeros = (req, res) => {
  Pasajero.find({})
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
};
