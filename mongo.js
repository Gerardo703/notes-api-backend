const mongoose = require('mongoose');
const connectionString = 'mongodb+srv://gerardo:admin123@cluster0.tfnmj.mongodb.net/midudb';

//Conectar a mongoDB
mongoose.connect(connectionString, {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
})
    .then( () => {
        console.log('Datbase Conected...');
    }).catch(err => {
        console.error(err);
    })

//Creamos la nota con sus campos (el id lo genera automaticamente MongoDB
// const note = new Note ({
//     content: 'Mongo DB es buenardo',
//     date: new Date(),
//     important: true
// });

//Guardamos la nota en la base de datos
// note.save()
//     .then(result => {
//         console.log(result);
//         mongoose.connection.close();
//     }).catch(err => {
//         console.error(err);
//     })