const express = require('express');
const app = express();
const cors = require('cors');
const notesRouter = require('./controllers/notes');
const userRouter = require('./controllers/users');

app.use(cors());
app.use(express.json());

app.use('/api/notes', notesRouter);
app.use('/api/users', userRouter);

module.exports = app;