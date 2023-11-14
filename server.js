const express = require('express');
const app = express();

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
    response.send('<h1>Notes Application</h1>');
});

// endpoint to view all the notes
app.get('/api/notes', (request, response) => {
    response.json(notes);
})

const HOSTNAME = 'localhost';
const PORT = 3001;

// make the server to listen to the defined portnumber
app.listen(PORT, () => {
    console.log(`Server running at http://${HOSTNAME}:${PORT}`);
});