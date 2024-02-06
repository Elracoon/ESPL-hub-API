import jwt from "jsonwebtoken";
import { accessDenied, invalidToken } from "../../bin/messages-constants.js";

async function authentification (req, res, next) {
    let token = req.header('Authorization');
    token = token.replace('Bearer ', '');
    if (!token) {
        return res.status(401).json({invalidToken});
    }
    try {
        const tokenDecoded = await jwt.verify(token, process.env.SECRET_KEY);
        req.user = tokenDecoded;
        next();
    } catch (error) {
        console.error(error);
        return res.status(401).json({message: accessDenied});
    }
}

export { authentification };