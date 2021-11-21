const {Schema, model, Model} = require('mongoose');

const NoteSchema = new Schema({
    titulo: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    usuario: {
        type : String,
        required : true
    }
}, {
    timestamps: true
})

module.exports = model('Note', NoteSchema);
