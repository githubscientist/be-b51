const express = require('express');
const app = express();
const cors = require('cors');
const notesRouter = require('./controllers/notes');

app.use(cors());
app.use(express.json());

// endpoint to view all the notes
app.use('/api/notes', notesRouter);

module.exports = app;