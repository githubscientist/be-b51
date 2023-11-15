const express = require('express');
const app = express();
const mongoose = require('mongoose');
const config = require('./utils/config');
const logger = require('./utils/logger');
const cors = require('cors');

app.use(cors());
app.use(express.json());

logger.info('Connecting to', config.MONGODB_URI);
mongoose.connect(config.MONGODB_URI)
    .then(() => {
        logger.info('Connected to MongoDB...');
    })
    .catch((err) => {
        logger.error('Error connecting to MongoDB:', err);
    });

// define a schema
const noteSchema = new mongoose.Schema({
    id: Number,
    content: String,
    important: Boolean
});

// create a model
const Note = mongoose.model('Note', noteSchema, 'notes');

// endpoint to view all the notes
app.get('/api/notes', (request, response) => {
    Note.find({}, {})
        .then(notes => {
            response.status(200).json(notes);
        });
});

module.exports = app;
