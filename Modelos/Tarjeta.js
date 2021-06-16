const { model, Schema } = require("mongoose");
const tarjetaSchema = new Schema({ numero:Number, titular:String, vencimiento:Date, codigo:Number});
const Tarjeta = model("Tarjeta", tarjetaSchema);
tarjetaSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});
module.exports = Tarjeta;
