const app = require('./server');
const config = require('./utils/config');
const logger = require('./utils/logger');
const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

logger.info('Connecting to', config.MONGODB_URI);
mongoose.connect(config.MONGODB_URI)
    .then(() => {
        logger.info('Connected to MongoDB...');
        app.listen(config.PORT, () => {
            logger.info(`Server running on port ${config.PORT}`);
        });
    })
    .catch((err) => {
        logger.error('Error connecting to MongoDB:', err);
    });