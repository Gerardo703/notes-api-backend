const mongoose = require('mongoose');

//Creamos un esquema de la nota
const noteSchema = mongoose.Schema({
    content: String,
    date: Date,
    important: Boolean
});

// Cambiamos el _id por id con returnedObject
noteSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id;
        delete returnedObject._id;
        delete returnedObject.__v;
    }
})

const Note = mongoose.model('Note', noteSchema);

module.exports = Note;