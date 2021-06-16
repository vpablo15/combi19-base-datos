const Viaje = require("../Modelos/Viaje")

const estaEnViajesPasados = async () => {
    const result = await Viaje.find({})
    console.log(result)
}

estaEnViajesPasados()