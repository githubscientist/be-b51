const notesRouter = require('express').Router();
const Note = require('../models/note');

// endpoint to get all the notes
notesRouter.get('/', (request, response) => {
    Note.find({}, {})
        .then(notes => {
            response.status(200).json(notes);
        });
});

// endpoint to create a new resource based on the request data
notesRouter.post('/', (request, response) => {
    const note = new Note(request.body);

    note.save()
        .then(() => {
            response.status(201).json({ message: 'note created successfully' });
        });
});

module.exports = notesRouter;