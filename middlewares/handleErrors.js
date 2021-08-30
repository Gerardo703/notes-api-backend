const HANDLE_ERRORS = {
    CastError: response => response.status(400).send({error: 'id used is malformed'}),

    ValidationError: (response, {message}) =>  
    response.status(409).send({ error: message }),

    JsonWebTokenError: (response ) => 
        response.status(401).json({ error: 'Token is missing or invalid' }),

    TokenExpiredError: response => 
        response.status(401).json({ error: 'Token expired' }),

    defaultError: response => response.status(500).end()
};

module.exports = (error, request, response, next) => {
    // console.error(error.name);
    const handler = HANDLE_ERRORS[error.name] || HANDLE_ERRORS.defaultError;
    handler(response, error);
};