const { model, Schema } = require("mongoose");
const combiSchema = new Schema({
  patente: String,
  modelo: String,
  chofer: { type: Schema.Types.ObjectId, ref: "Chofer" },
  cantidadDeAsientos: Number,
  tipoDeCombi: String,
  bajaL:Boolean
});
const Combi = model("Combi", combiSchema);
combiSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});
module.exports = Combi;
