require('./mongo');

const express = require('express');
const cors = require('cors');
const app = express();
const Note = require('./models/Note');

app.use(express.json());
app.use(cors());

//Obtener la pagina home
app.get('/', (request, response) => {
    response.send('<h1>Api Rest Notes</h1>');
});

//Obtener todas las notas
app.get('/api/notes', (request, response) => {
    Note.find({}).then(notes => {
        response.json(notes);
    });
});

//Obtener una nota por su Id
app.get('/api/notes/:id', (request, response, next) => {
    const { id } = request.params;

    Note.findById(id).then(note => {
        if(note){
            response.json(note);
        } else{
            response.status(404).end();
        }
    }).catch(err => {
        next(err);
    })
});

//Eliminar una nota por su Id
app.delete('/api/notes/:id', (request, response, next) => {
    const { id } = request.params;
    Note.findByIdAndRemove(id).then( result => {
        response.status(204).end();
    }).catch(error => next(error))
    
    response.status(204).end();
});

//Editar una nota 
app.put('/api/notes/:id', (request, response, next) => {
    const { id } = request.params;
    const note = request.body;

    const noteInfo = {
        content: note.content,
        important: note.important
    };

    Note.findByIdAndUpdate(id, noteInfo, { new: true } ).then( result => {
        response.json(result);
    }).catch(error => next(error))

});

//Agregar una nueva Nota
app.post('/api/notes', (request, response) => {

    const note = request.body;

    if(!note.content){
        return response.status(404).json({
            error: 'required "content" field missing'
        });
    };

    const newNote = new Note({
        content: note.content,
        date: new Date(),
        important: note.important || false
    });

    newNote.save()
        .then(savedNote => {
            response.json(savedNote);
    });

    // response.status(201).json(newNote);
});

//Middleware que controla los errores
app.use((request, response, next) => {
    response.status(404).send();
})

app.use((error, request, response, next) => {
    console.log(error);

    if(error.name === 'CastError'){
        response.status(400).send({error: 'id used is malformed'});
    } else {
        response.status(500).end();
    }
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log('Servidor corriendo existosamente');
});
