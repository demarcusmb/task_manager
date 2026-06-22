// Middleware function used to validate incoming task data
const validateTask = (
    req,   // Request object containing data from the client
    res,   // Response object used to send data back to the client
    next   // Function that passes control to the next middleware
) => {

    // Extract the title field from the request body
    // Example request body:
    // { "title": "Learn Express" }
    const { title } = req.body;

    // Check if:
    // 1. title is missing (undefined, null, etc.)
    // OR
    // 2. title contains only whitespace characters
    if (!title || title.trim() === "") {

        // Return a 400 Bad Request response
        return res.status(400).json({
            message: "Title is required",
        });
    }

    // If validation passes, continue to the next middleware
    // or route handler
    next();
};

// Export the middleware so it can be used in routes
module.exports = validateTask;