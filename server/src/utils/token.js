import jwt from "jsonwebtoken";
import { errorHandler } from "./error.js";
import { JWT_SECRET } from "../config/index.js";

export const createToken = (payload) => {
    try {
        return jwt.sign(payload, JWT_SECRET, {
            expiresIn: '1d'
        })
    } catch (error) {
        console.log(error?.message)
    }
}

export const verifyToken = (req, res, next) => {
    const { access_token = '' } = req.body;
    if (!access_token) return next(errorHandler(401, 'You are not authenticated!'));
    jwt.verify(access_token, JWT_SECRET, (err, user) => {
        if (err) return next(errorHandler(403, 'Token is not valid!'));
        req.user = user;
        next()
    })
}


