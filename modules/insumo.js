const { Schema, model } = require('mongoose'); // Importa las funciones Schema y model de mongoose para definir esquemas y modelos de datos
// Define el esquema del modelo insumo

const InsumoSchema = Schema({
    id_insumo: {
        type: Number,
        required: [true, 'El identificador del insumo es obligatorio'],
        unique: true
    },
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    cantidad: {
        type: Number,
        required: [true, 'La cantidad es obligatoria']
    },
    id_categoria: {
        type: Number,
        required: [true, 'El identificador de la categoría es obligatoria']
    }
})

// Crea y exporta el modelo insumo a partir del esquema insumoSchema
module.exports = model('Insumo', InsumoSchema);
