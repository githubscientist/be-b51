/*
    Backend using NodeJS & Express & MongoDB

    1. Create a new project folder
    2. cd into the folder
    3. npm init -y (creates package.json)
    4. create a new file called index.js (entry point)
    
    In index.js:
        1. connect to MongoDB
        2. For that, we need to create a cluster in MongoDB Atlas
        (https://www.mongodb.com/cloud/atlas)
            - create a new user in the cluster
            - create a new database in the cluster
            - create a new collection in the database (notes)
            - create a new document in the collection (note)
        3. take the URI connection string from MongoDB Atlas & user credentials
        4. install mongoose: npm install mongoose (mongoose is to handle MongoDB in NodeJS environment easily)
        5. import mongoose in index.js
        6. connect to MongoDB using mongoose.connect()
        7. set the strictQuery option to false: mongoose.set('strictQuery', false); (to avoid deprecation warning)
        8. install express: npm install express
        9. import express in index.js
        10. create a new express app: const app = express();
        11. start the server: app.listen(3001, () => { console.log('Server running on port 3001'); });
        12. install nodemon: npm install nodemon --save-dev (for development only to restart the server automatically whenever we make changes to the code)
        13. add a new script in package.json: "start": "node index.js", "dev": "nodemon index.js"
        14. stop the server and start it again using npm run dev (to use nodemon)
        15. install dotenv: npm install dotenv (to use environment variables)
        16. create a new file called .env and add the following:
            PORT=3001
            MONGODB_URI=connection string from MongoDB Atlas
        17. create a folder called utils and a file called config.js inside it
            - inside config.js:
                - require('dotenv').config();
                - const MONGODB_URI = process.env.MONGODB_URI;
                - const PORT = process.env.PORT;
                - export the variables: module.exports = { MONGODB_URI, PORT };
        18. now in index.js, import config.js: const config = require('./utils/config');
        19. change the port number to use the environment variable: app.listen(config.PORT, () => { console.log(`Server running on port ${config.PORT}`); });
        20. change the MongoDB connection string to use the environment variable: mongoose.connect(config.MONGODB_URI);
    
    Create a new file called server.js or app.js:
        - move the code to create the express app from index.js to server.js
        - export the app: module.exports = app;
        - import the app in index.js: const app = require('./app');
    
    Create a new folder called models and a file called note.js inside it:
        - import mongoose: const mongoose = require('mongoose');
        - define a schema: const noteSchema = new mongoose.Schema({ id: Number, content: String, important: Boolean });
        - export the model: module.exports = mongoose.model('Note', noteSchema, 'notes');
    
    Create a new folder called controllers and a file called notes.js inside it:
        - create a new router: const notesRouter = require('express').Router();
        - import the Note model: const Note = require('../models/note');
        - define the endpoints for CRUD operations in that router of the collection notes:
            - endpoint to get all the notes
                - notesRouter.get('/', (request, response) => {
                    Note.find({}, {})
                        .then(notes => {
                            response.status(200).json(notes);
                        });
                });
            - endpoint to create a new resource based on the request data
                - notesRouter.post('/', (request, response) => {
                    const note = new Note(request.body);

                    note.save()
                        .then(() => {
                            response.status(201).json({ message: 'note created successfully' });
                        });
                });
            - endpoint to fetch a single resource based on it
                - notesRouter.get('/:id', (request, response) => {
                    const id = request.params.id;

                    Note.findById(id)
                        .then(note => {
                            response.status(200).json(note);
                        })
                        .catch(err => {
                            response.status(404).json({ message: 'id does not exists' });
                        })
                });
            - deletes a single resource based on id
                - notesRouter.delete('/:id', (request, response) => {
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
            - replaces the entire note object identified by an id
                - notesRouter.put('/:id', (request, response) => {
                    const id = request.params.id;

                    const noteToReplace = request.body;

                    Note.findByIdAndUpdate(id, noteToReplace)
                        .then(updatedNote => {
                            if (updatedNote) {
                                response.status(200).json({ message: 'note updated successfully' });
                            }
                        }
                        )

                }
                );
        - export the router: module.exports = notesRouter;

    In server.js:
        - import the notesRouter: const notesRouter = require('./controllers/notes');
        - use the notesRouter: app.use('/api/notes', notesRouter);
        - install cors: npm install cors
        - import cors: const cors = require('cors');
        - use cors: app.use(cors()); (to allow cross-origin requests)
        - use express.json(): app.use(express.json()); (to parse the request body as JSON)

*/