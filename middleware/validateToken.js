const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = asyncHandler(async (req, res, next) => {
    let token;
    let authHeader = req.headers.authorization || req.headers.Authorization;

    // Ensure authHeader is treated as a string
    if (typeof authHeader === 'string' && authHeader.startsWith("Bearer")) {
        token = authHeader.split(" ")[1]; // extract the token
        jwt.verify(token, 'demoporject', (err, decoded) => {
            if (err) {
                res.status(401);
                throw new Error("User is not authorized");
            }
            // @ts-ignore
            req.user = decoded.user;
            next();
        });
    } else {
        throw new Error("User is not authorized or token is missing");
    }
});

module.exports = validateToken;
