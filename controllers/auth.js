const Insumo = require("../modules/insumo");

// Función de inicio de sesión
const login = async (req, res) => {
  const { id_insumo, nombre, cantidad, id_categoria } = req.body; // Extrae los campos del cuerpo de la solicitud

  // Busca un insumo en la base de datos que coincida con el id_insumo proporcionado
  const insumo = await Insumo.findOne({ id_insumo });

  try {
    // Verifica si el insumo existe en la base de datos
    if (!insumo) {
      return res.status(400).json({
        msg: "Insumo no encontrado",
      });
    }

    // Verifica si el insumo está activo
    // if (!insumo.estado) {
    //   return res.status(400).json({
    //     msg: "insumo inactivo",
    //   });
    // }
  } catch (err) {
    return res.status(400).json({
      msg: "No se pudo encontrar el insumo.", // Mensaje de error genérico en caso de fallo
    });
  }
};

// Exporta la función de inicio de sesión para que esté disponible para otros módulos
module.exports = {
  login,
};
