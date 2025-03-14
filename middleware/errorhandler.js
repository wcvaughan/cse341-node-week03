const errorHandler = (err, req, res, next) => {
    console.error(err.stack) //log error for debugging

    const statusCode = err. statusCode || 500;
    res.status(statusCode).json({
        message: err.message || 'Internal Server Error',
        error: process.env.NODE_ENV === 'production' ? {} : err, // hide details in prod
    });
};

module.exports = errorHandler;