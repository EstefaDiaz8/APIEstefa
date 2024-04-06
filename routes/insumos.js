const { Router } = require('express'); // Importa la función Router de express para crear un router
const router = Router(); // Crea una instancia de Router
const { insumosGet, insumosPost, insumosPut, insumosDelete, PromGet } = 
require('../controllers/insumo'); // Importa los controladores desde el archivo '../controllers/insumo'
// Define rutas y asigna controladores a cada ruta
// Ruta para obtener todos los insumos (GET '/')
router.get('/', insumosGet);
// Ruta para obtener el promedio de insumos (GET '/promedio')
router.get('/promedio', PromGet);
// Ruta para crear un nuevo insumo (POST '/')
router.post('/', insumosPost);
// Ruta para actualizar un insumo existente (PUT '/')
router.put('/:id_insumo', insumosPut);
// Ruta para eliminar un insumo existente (DELETE '/')
router.delete('/:id_insumo', insumosDelete);
// Exporta el router para que esté disponible para otros módulos
module.exports = router;
