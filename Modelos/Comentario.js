const { model, Schema } = require("mongoose");
const comentarioSchema = new Schema({
  pasajero: { type: Schema.Types.ObjectId, ref: "Pasajero" },
  comentario: String,
  fecha: Date,
  modificado: false,
});
const Comentario = model("Comentario", comentarioSchema)
comentarioSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});
module.exports = Comentario;