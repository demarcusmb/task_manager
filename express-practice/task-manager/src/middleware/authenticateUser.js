const jwt = require("jsonwebtoken");

module.exports = (req,res,next) => {
    console.log("AUTH MIDDLEWARE HIT");
    const authHeader = req.headers.authorization;
   // console.log("AUTH HEADER:", req.headers.authorization);
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

        console.log("DECODED TOKEN:", decoded);

        req.user = decoded;

        next();
    } catch(error){
        console.log("Error: ", error.message);
        return res.status(401).json({
            message: "Invalid token"
        });
    }
}