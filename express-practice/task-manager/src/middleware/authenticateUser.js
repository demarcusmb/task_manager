const jwt = require("jsonwebtoken");

module.exports = (req,res,next) => {
    const authHeader = req.headers.authorization;
    if(!authHeader){
        return res.status(401).json({
            message:"Authorization header missing"
        });
    }

    const token = req.headers.authorization?.split(" ")[1];

    try{
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.user = decoded;

        next();
    } catch(error){
        console.log("Error: ", error.message);
        return res.status(401).json({
            message: "Invalid token"
        });
    }
}