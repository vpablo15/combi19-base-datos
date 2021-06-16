const { model, Schema } = require("mongoose");
const insumoPasajeroSchema = new Schema({
  id_pasajero: { type: Schema.Types.ObjectId, ref: "Pasajero" },
  id_insumo: { type: Schema.Types.ObjectId, ref: "Insumo" },
  cantidad: Number,
});
const InsumoPasajero = model("InsumoPasajero", insumoPasajeroSchema);
insumoPasajeroSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});
module.exports = InsumoPasajero;
