// const http = require('http');
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

let notes = [
    {
      id: 1,
      content: "Midu Full Stack Bootcamp",
      date: "2019-05-30T17:30:31.098Z",
      important: true
    },
    {
      id: 2,
      content: "Node JS",
      date: "2019-05-30T18:39:34.091Z",
      important: false
    },
    {
      id: 3,
      content: "React JS Hooks",
      date: "2019-05-30T19:20:14.298Z",
      important: true
    }
]

//Obtener la pagina home
app.get('/', (request, response) => {
    response.send('<h1>Api Rest Notes</h1>');
});

//Obtener todas las notas
app.get('/api/notes', (request, response) => {
    response.json(notes);
});

//Obtener una nota por su Id
app.get('/api/notes/:id', (request, response) => {
    const id = Nmber(request.params.id);
    const note = notes.find( note => note.id === id);
    
    if(note){
        response.json(note);
    } else{
        response.status(404).end();
    }
});

//Eliminar una nota por su Id
app.delete('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id);
    notes = notes.filter( note =>  note.id != id);
    
    response.status(204).end();
});

//Agregar una nueva Nota
app.post('/api/notes', (request, response) => {

    const note = request.body;
    const ids = notes.map( note => note.id);
    const maxId = Math.max(...ids);

    const newNote = {
        id: maxId + 1,
        content: note.content,
        date: new Date().toISOString(),
        important: typeof note.important != 'undefined' ? note.important : false
    }

    notes = [ ...notes, newNote ];
    response.status(201).json(newNote);
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log('Servidor corriendo existosamente');
});
