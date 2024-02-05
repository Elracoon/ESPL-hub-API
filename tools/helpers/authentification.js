import jwt from "jsonwebtoken";
import { invalidToken } from "../../bin/messages-constants.js";

async function authentification (req, res, next) {
    let token = req.header('Authorization');
    token = token.replace('Bearer ', '');
    if (!token) {
        return res.status(401).json({invalidToken});
    }
    try {
        const tokenDecoded = await jwt.verify(token, secretKey);
        req.user = tokenDecoded;
        next();
    } catch (error) {
        return res.status(401).json({message: messages.accesDenied.message});
    }
}

export { authentification };