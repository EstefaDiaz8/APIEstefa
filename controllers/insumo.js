const { response } = require("express"); // Importa la función `response` desde el módulo express
const bcrypt = require("bcryptjs"); // Importa la librería bcryptjs para el cifrado de contraseñas
// Importar modelos
const Insumo = require("../modules/insumo"); // Importa el modelo de Insumo desde el módulo '../modules/insumo'

// Controlador para la solicitud GET a la ruta de insumos
const insumosGet = async (req, res = response) => {
  const body = req.query; // Extrae los parámetros de la consulta
  const { q, nombre, page = 1, limit } = req.query; // Extrae los parámetros de la consulta
  const insumos = await Insumo.find(); // Consulta todos los documentos de la colección Insumo
  res.json({
    insumos, // Devuelve un objeto JSON con los insumos obtenidos de la base de datos
  });
};

// Controlador para la solicitud GET de promedio de insumos
const PromGet = async (req, res = response) => {
  const body = req.query; // Extrae los parámetros de la consulta
  const { q, nombre, page = 1, limit } = req.query; // Extrae los parámetros de la consulta
  const insumos = await Insumo.find(); // Consulta todos los documentos de la colección Insumo
  insumos.forEach((numero) => console.log(numero)); // Muestra cada documento de insumo por consola
  res.json({
    msg: "Prom API controlador", // Devuelve un mensaje indicando que es el controlador del promedio
    q,
    nombre,
    page,
    limit,
    insumos, // Devuelve los insumos obtenidos de la base de datos
  });
};

// Controlador para la solicitud POST a la ruta de insumos
const insumosPost = async (req, res = response) => {
  const body = req.body; // Extrae el cuerpo de la solicitud
  let msg = ""; // Inicializa una variable para el mensaje de respuesta
  const insumo = new Insumo(body); // Crea un nuevo objeto Insumo con los datos del cuerpo de la solicitud
  const { id_insumo, nombre, cantidad, id_categoria } = req.body; // Extrae los datos del cuerpo de la solicitud
  await insumo.save(); // Guarda el insumo en la base de datos
  msg = "Insumo Registrado"; // Asigna un mensaje de éxito
  console.log(msg); // Muestra el mensaje de respuesta por consola
  res.json({
    msg: msg, // Devuelve el mensaje de respuesta como un objeto JSON
  });
};

// Controlador para la solicitud PUT a la ruta de insumos
const insumosPut = async (req, res = response) => {
  const body = req.body; // Extrae los parámetros de la consulta
  console.log(body); // Muestra los parámetros de la consulta por consola
  const { id_insumo, nombre, cantidad, id_categoria } = req.body; // Extrae los datos del cuerpo de la solicitud
  // Busca y actualiza un insumo en la base de datos
  try {
    const insumo = await Insumo.findOneAndUpdate(
      { _id:id_insumo },
      { nombre: nombre, cantidad: cantidad, id_categoria: id_categoria},
      { new: true}
  
    );
    res.json({
      msg: "Insumo Modificado", // Devuelve un mensaje indicando que se modificó el insumo
      insumo, // Devuelve el insumo modificado
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al modificar el insumo "});
  }
};

// Controlador para la solicitud DELETE a la ruta de insumos
const insumosDelete = async (req, res = response) => {
  const { id_insumo } = req.params; // Extrae el ID del insumo de los parámetros de la URL
  try {
    // Busca y elimina un insumo en la base de datos
    const insumo = await Insumo.findOneAndDelete({ _id: id_insumo });
    if (!insumo) {
      // Si no se encuentra el insumo, devuelve un mensaje de error
      return res.status(404).json({ msg: "Insumo no encontrado" });
    }
    res.json({
      msg: "Insumo Eliminado", // Devuelve un mensaje indicando que se eliminó el insumo
      insumo, // Devuelve el insumo eliminado
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al eliminar el insumo" }); // Manejo de errores
  }
};


// Exporta los controladores de las rutas de insumos para que estén disponibles para otros módulos
module.exports = {
  insumosGet,
  insumosPost,
  insumosPut,
  insumosDelete,
  PromGet,
};
