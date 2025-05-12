
import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
const JWT_USER_PASSWORD = "Sameer123"

export const userMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const header = req.headers["authorization"];
    const decoded = jwt.verify(header as string, JWT_USER_PASSWORD)
   
    if(decoded){
        // @ts-ignore
        req.userId = decoded.id
        next();
    }else{
        res.json({
            message: "you are not logged in"
        })
    }
}
