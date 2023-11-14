const express = require('express');
const app = express();

// middleware
app.use(express.json());

/*
    endpoints

    URL             Request Type        Functionality
    /api/notes      GET                 fetches all the notes
    /api/notes/10   GET                 fetches a single note
    /api/notes      POST                creates a new note based on the request data
    /api/notes/10   DELETE              deletes a note identified by id
    /api/notes/10   PUT                 replaces the entire note identified by id with the request data
    /api/notes/10   PATCH               replaces a part of the note identified by id with the request data
*/

let notes = [
    {
        id: 1,
        content: 'backend using node.js',
        important: true
    },
    {
        id: 2,
        content: 'node.js is a open source',
        important: false,
    },
    {
        id: 3,
        content: 'simple web server using node.js',
        important: true
    },
    {
        id: 4,
        content: 'express makes backend restful painless',
        important: true
    },
    {
        id: 5,
        content: 'backend restful using nodejs will grow complex',
        important: false
    }
];

// set the endpoints
// set the / route
app.get('/', (request, response) => {
    response.send('<h1>Notes App</h1>');
});

// endpoint to view all the notes
app.get('/api/notes', (request, response) => {
    response.json(notes);
});

// endpoint to fetch a single note
app.get('/api/notes/:id', (request, response) => {
    // get the id from the params
    const id = request.params.id;

    // find the note with the id in notes data
    const note = notes.find(note => note.id == id);

    if (note) {
        // if such an object with the id exists
        response.status(200).json(note);
    } else {
        response.status(404).json({ message: 'id does not exists' });
    }
});

// endpoint to delete a note identified by id
app.delete('/api/notes/:id', (request, response) => {
    // get the id from the params
    const id = request.params.id;

    // find the note matching the id
    const note = notes.find(note => note.id == id);

    notes = notes.filter(note => note.id != id);

    if (note) {
        response.status(204).json(note);
    } else {
        response.status(404).json({ message: 'id does not exists' });
    }
});

// endpoint to create a new note based on the request data
app.post('/api/notes', (request, response) => {
    notes = notes.concat(request.body);
    response.status(201).json({ message: 'note created successfully' });
});

// endpoint to replace the entire note identified by id with the request data
app.put('/api/notes/:id', (request, response) => {
    // get the id from the params
    const id = request.params.id;

    // get the note to replace from the user - request body
    const noteToReplace = request.body;

    // find the object matching the id
    const note = notes.find(note => note.id == id);

    notes = notes.map(note => note.id == id ? noteToReplace : note);

    if (note) {
        response.status(200).json({ message: 'note replaced' });
    } else {
        response.status(404).json({ message: 'id does not exists' });
    }
});

// endpoint to patch a part of note identified by id with the request data
app.patch('/api/notes/:id', (request, response) => {
    // get the id from the params
    const id = request.params.id;

    // get the note to replace from the user - request body
    const noteToReplace = request.body;

    // find the object matching the id
    const note = notes.find(note => note.id == id);

    notes = notes.map(note => note.id == id ? {...note, ...noteToReplace} : note);

    if (note) {
        response.status(200).json({ message: 'note patched' });
    } else {
        response.status(404).json({ message: 'id does not exists' });
    }
});

const HOSTNAME = 'localhost';
const PORT = 3001;

// make the server to listen to the defined portnumber
app.listen(PORT, () => {
    console.log(`Server running at http://${HOSTNAME}:${PORT}`);
});