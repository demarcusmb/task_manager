// Global error-handling middleware for Express
// Express recognizes this as an error handler because it has 4 parameters:
// err, req, res, next
const errorHandler = (
    err,   // The error object that was passed using next(error)
    req,   // The incoming request object
    res,   // The response object used to send data back to the client
    next   // The next middleware function (not used here, but required)
) => {

    // Log the full error to the server console
    // Useful for debugging during development
    console.log(err);

    // Send a generic error response to the client
    // Status code 500 means "Internal Server Error"
    res.status(500).json({
        message: "Internal Server Error",
    });
};

// Export the middleware so it can be used in app.js
module.exports = errorHandler;