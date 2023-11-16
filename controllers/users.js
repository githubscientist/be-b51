const userRouter = require('express').Router();
const User = require('../models/user');

// endpoint to get all the users
userRouter.get('/', (request, response) => {
    User.find({}, {})
        .then(user => {
            response.status(200).json(user);
        });
});

// endpoint to create a new resource based on the request data
userRouter.post('/', (request, response) => {
    const user = new User(request.body);

    user.save()
        .then(() => {
            response.status(201).json({ message: 'user created successfully' });
        });
});

// endpoint to fetch a single resource based on it
userRouter.get('/:id', (request, response) => {
    const id = request.params.id;

    User.findById(id)
        .then(user => {
            response.status(200).json(user);
        })
        .catch(err => {
            response.status(404).json({ message: 'id does not exists' });
        })
});

// deletes a single resource based on id
userRouter.delete('/:id', (request, response) => {
    const id = request.params.id;

    User.findByIdAndDelete(id)
        .then(deletedUser => {
            if (deletedUser) {
                response.status(204).json({ message: 'user deleted successfully' });
            } else {
                response.status(404).json({ message: 'id does not exists' });
            }
        })
        .catch(err => {
            response.status(404).json({ message: 'deleting user failed' });
        })
});

// replaces the entire note object identified by an id
userRouter.put('/:id', (request, response) => {
    const id = request.params.id;

    const userToReplace = request.body;

    User.findByIdAndUpdate(id, userToReplace)
        .then(updatedUser => {
            if (updatedUser) {
                response.status(200).json({ message: 'user replaced successfully' });
            } else {
                response.status(404).json({ message: 'id does not exists' });
            }
        })
        .catch(err => {
            response.status(404).json({ message: 'replacing the user failed...' });
        })
});

userRouter.patch('/:id', (request, response) => {
    const id = request.params.id;

    const userToPatch = request.body;

    User.findByIdAndUpdate(id, userToPatch)
        .then(updatedUser => {
            if (updatedUser) {
                response.status(200).json({ message: 'user patched successfully' });
            } else {
                response.status(404).json({ message: 'id does not exists' });
            }
        })
        .catch(err => {
            response.status(404).json({ message: 'patching the user failed...' });
        })
});

module.exports = userRouter;