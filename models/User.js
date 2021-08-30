var uniqueValidator = require('mongoose-unique-validator'); 
const mongoose = require('mongoose');

//Creamos un esquema de la nota
const userSchema = mongoose.Schema({
    userName: {
        type: String,
        unique: true
    },
    name: String,
    passwordHash: String,
    notes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Note'
    }]
});

// Cambiamos el _id por id con returnedObject
userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id;
        delete returnedObject._id;
        delete returnedObject.__v;

        delete returnedObject.passwordHash;
    }
});

userSchema.plugin(uniqueValidator);

const User = mongoose.model('User', userSchema);

module.exports = User;

