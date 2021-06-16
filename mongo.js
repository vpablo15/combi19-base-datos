const mongoose = require("mongoose");
const password = require("./credenciales.js");
const connectionString = `mongodb+srv://pablo1919:${password}@cluster0.o7a2n.mongodb.net/dbCombi?retryWrites=true&w=majority`;
mongoose
  .connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.log(err);
  });
