const { model, Schema } = require("mongoose");
const viajePasajeroSchema = new Schema({
  idPasajero: { type: Schema.Types.ObjectId, ref: "Pasajero" },
  idViaje: { type: Schema.Types.ObjectId, ref: "Viaje" },
});
const ViajePasajero = model("ViajePasajero", viajePasajeroSchema);
viajePasajeroSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});
module.exports = ViajePasajero;