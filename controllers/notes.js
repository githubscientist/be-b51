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

// endpoint to fetch a single resource based on it
notesRouter.get('/:id', (request, response) => {
    const id = request.params.id;

    Note.findById(id)
        .then(note => {
            response.status(200).json(note);
        })
        .catch(err => {
            response.status(404).json({ message: 'id does not exists' });
        })
});

// deletes a single resource based on id
notesRouter.delete('/:id', (request, response) => {
    const id = request.params.id;

    Note.findByIdAndDelete(id)
        .then(deletedNote => {
            if (deletedNote) {
                response.status(204).json({ message: 'note deleted successfully' });
            } else {
                response.status(404).json({ message: 'id does not exists' });
            }
        })
        .catch(err => {
            response.status(404).json({ message: 'deleting note failed' });
        })
});

// replaces the entire note object identified by an id
notesRouter.put('/:id', (request, response) => {
    const id = request.params.id;

    const noteToReplace = request.body;

    Note.findByIdAndUpdate(id, noteToReplace)
        .then(updatedNote => {
            if (updatedNote) {
                response.status(200).json({ message: 'note replaced successfully' });
            } else {
                response.status(404).json({ message: 'id does not exists' });
            }
        })
        .catch(err => {
            response.status(404).json({ message: 'replacing the note failed...' });
        })
});

notesRouter.patch('/:id', (request, response) => {
    const id = request.params.id;

    const noteToPatch = request.body;

    Note.findByIdAndUpdate(id, noteToPatch)
        .then(updatedNote => {
            if (updatedNote) {
                response.status(200).json({ message: 'note patched successfully' });
            } else {
                response.status(404).json({ message: 'id does not exists' });
            }
        })
        .catch(err => {
            response.status(404).json({ message: 'patching the note failed...' });
        })
});

module.exports = notesRouter;