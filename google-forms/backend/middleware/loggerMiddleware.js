const logger = require('../config/logger');

const logRequests = (req, res, next) => {
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.socket.remoteAddress || (req.connection.socket ? req.connection.socket.remoteAddress : null);

    const realIp = ip === '::1' ? '127.0.0.1' : ip;
    logger.info(`IP: ${realIp} | Method: ${req.method} | URL: ${req.url}`);
    
    next();
};

module.exports = logRequests;
