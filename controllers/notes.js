const jwt = require('jsonwebtoken');
const notesRouter = require('express').Router();
const Note = require('../models/Note');
const User = require('../models/User');

const getTokenForm = request => {
    const authorization = request.get('authorization')
    if(authorization && authorization.toLowerCase().startsWith('bearer ')){
        return authorization.substring(7);
    };
    return null;
};

notesRouter.post('/', async(request, response, next) => {
    try {
        const {content, important} = request.body;

        const token = getTokenForm(request);
        const decodedToken = jwt.verify(token, "" + process.env.SECRET);

        if(!token || !decodedToken.id){
            return response.status(401).json({
                error: 'Token is missing or invalid'
            });
        };

        if(!content){
            return response.status(404).json({
                error: 'required "content" field missing'
            });
        };

        const user = await User.findById(decodedToken.id);

        const note = new Note({
            content: content,
            important: important === undefined ? false : important,
            date: new Date(),
            user: user._id
        });

        const savedNote = await note.save();
        user.notes = user.notes.concat(savedNote._id);
        await user.save();
        
        response.json(savedNote);
        
    } catch (error) {
        next(error);
    }
    
});

notesRouter.get('/', async(request, response, next) => {
    try {
        const noteFind = await Note.find({}).populate('user', { userName: 1, name: 1 });
        response.json(noteFind);

    } catch (error) {
        next(error);
    }
});

notesRouter.get('/:id', async(request, response, next) => {
    try {
        const { id } = request.params;

        const note = await Note.findById(id).populate('user', { userName: 1, name: 1 });
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

        const token = getTokenForm(request);
        const decodedToken = jwt.verify(token, "" + process.env.SECRET);

        if(!token || !decodedToken.id){
            return response.status(401).json({
                error: 'Token is missing or invalid'
            });
        };

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

        const token = getTokenForm(request);
        const decodedToken = jwt.verify(token, "" + process.env.SECRET);

        if(!token || !decodedToken.id){
            return response.status(401).json({
                error: 'Token is missing or invalid'
            });
        };

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