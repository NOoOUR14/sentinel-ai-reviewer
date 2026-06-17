const app = require('./app');
const config = require('./config');
const { connectDB } = require('./database');
const logger = require('./utils/logger');

const startServer = async () => {
    try {
        await connectDB();

        const PORT = config.port || 5000;

        app.listen(PORT, () => {
            logger.info(`Server is flying on port ${PORT}`);
            logger.info(`Environment: ${config.env}`);
        });
    } catch (error) {
        logger.error(`Failed to start server: ${error.message}`);
        process.exit(1);
    }
};

startServer();