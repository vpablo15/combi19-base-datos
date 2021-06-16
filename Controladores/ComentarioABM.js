const Comentario = require("../Modelos/Comentario.js");

const buscarComentarioPorId = (req, res) => {
  const { id } = req.params;
  Comentario.find({pasajero:id}).then((result) => {
    res.json(result);
  });
};

const agregarComentario = (req, res) => {
  const dataComentario = req.body;
  if (!dataComentario) {
    return res.status(404).end();
  }
  // const { pasajero, comentario, modificado } = dataComentario;
  const nuevoComentario = new Comentario({
    ...dataComentario
  });
  nuevoComentario.save().then((result) => {
    console.log(result);
  });
};

const modificarComentario = (req, res) => {
  const { id } = req.params;
  const comentarioActualizado = req.body;
  if (!comentarioActualizado) {
    res.status(404).end();
  }
  Comentario.findByIdAndUpdate(id, comentarioActualizado, { new: true }).then((result) => {
    console.log(result);
  });
};

const borrarComentario = (req, res) => {
  const { id } = req.params;
  Comentario.findByIdAndRemove(id).then((result) => {
    console.log(result);
  });
};

const listarComentarios = (req, res) => {
  Comentario.find({}).populate('pasajero').limit(10).then((dataComentarios) => {
    const result = dataComentarios.reverse()
    res.json(result);
    console.log('result',result)
  });
};

module.exports = {
  buscarComentarioPorId,
  agregarComentario,
  modificarComentario,
  borrarComentario,
  listarComentarios,
};