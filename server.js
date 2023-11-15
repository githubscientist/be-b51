const express = require('express');
const app = express();
const mongoose = require('mongoose');
const config = require('./utils/config');
const logger = require('./utils/logger');
const cors = require('cors');
const notesRouter = require('./controllers/notes');

mongoose.set('strictQuery', false);

logger.info('Connecting to', config.MONGODB_URI);
mongoose.connect(config.MONGODB_URI)
    .then(() => {
        logger.info('Connected to MongoDB...');
    })
    .catch((err) => {
        logger.error('Error connecting to MongoDB:', err);
    });

app.use(cors());
app.use(express.json());

// endpoint to view all the notes
app.use('/api/notes', notesRouter);

module.exports = app;
