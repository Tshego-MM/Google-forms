module.exports = {
    APP_NAME: 'Google Form',
    VERSION: '1.0.0',
    STATUS_CODES: {
        SUCCESS: 200,
        BAD_REQUEST: 400,
        UNAUTHORIZED: 401,
        FORBIDDEN: 403,
        NOT_FOUND: 404,
        INTERNAL_SERVER_ERROR: 500
    },
    MESSAGES: {
        SUCCESS: 'Success',
        BAD_REQUEST: 'Bad Request',
        UNAUTHORIZED: 'Unauthorized',
        FORBIDDEN: 'Forbidden',
        NOT_FOUND: 'Not Found',
        INTERNAL_SERVER_ERROR: 'Internal Server Error'
    },
    RATE_LIMIT: {
        WINDOW_MS: 10 * 60 * 1000,
        MAX_REQUESTS: 50,
        MESSAGE: {
            message: 'Too many requests from this IP, please try again later.'
        }
    },FORM:{
        maxQuestions : 50,
        maxOptions : 5
    }
};