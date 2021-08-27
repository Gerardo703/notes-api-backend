const notesRouter = require('express').Router();
const Note = require('../models/Note');

notesRouter.post('/', async(request, response, next) => {
    try {
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

        const noteSaved = await newNote.save();
        response.status(200).json(noteSaved);
        
    } catch (error) {
        next(error);
    }
    
});

notesRouter.get('/', async(request, response, next) => {
    try {
        const noteFind = await Note.find()
        response.json(noteFind);

    } catch (error) {
        next(error);
    }
});

notesRouter.get('/:id', async(request, response, next) => {
    try {
        const { id } = request.params;

        const note = await Note.findById(id)
        note 
            ? response.json(note) 
            : response.status(404).end();

    } catch (error) {
        next(error);
    }
});

notesRouter.delete('/:id', async(request, response, next) => {
    try {
        const { id } = request.params;
        await Note.findByIdAndDelete(id)
        response.status(204).end();   

    } catch (error) {
        next(error);
    }
});

notesRouter.put('/:id', async(request, response, next) => {
    try {
        const { id } = request.params;
        const note = request.body;

        const noteInfo = {
            content: note.content,
            important: note.important
        };
        const noteEdited = await Note.findByIdAndUpdate(id, noteInfo, { new: true } )
        response.json(noteEdited);

    } catch (error) {
        next(error);
    }
});

notesRouter.get

module.exports = notesRouter;