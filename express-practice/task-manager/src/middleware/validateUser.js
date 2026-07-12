// Middleware function used to validate incoming task data
const validateTask = (
    req,   // Request object containing data from the client
    res,   // Response object used to send data back to the client
    next   // Function that passes control to the next middleware
) => {

    // Extract the name field from the request body
    // Example request body:
    // { "name: "user123" }
    const { userName } = req.body;

    // Check if:
    // 1. name is missing (undefined, null, etc.)
    // OR
    // 2. name contains only whitespace characters
    if (!userName || userName.trim() === "") {

        // Return a 400 Bad Request response
        return res.status(400).json({
            message: "Username is required",
        });
    }

    // Extract the name field from the request body
    // Example request body:
    // { "password: "password123" }
    const { password } = req.body;

    // Check if:
    // 1. password is missing (undefined, null, etc.)
    // OR
    // 2. password contains only whitespace characters
    if (!password || password.trim() === "") {

        // Return a 400 Bad Request response
        return res.status(400).json({
            message: "Password is required",
        });
    }

    // If validation passes, continue to the next middleware
    // or route handler
    next();
};

// Export the middleware so it can be used in routes
module.exports = validateTask;