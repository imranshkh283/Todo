import jwt, { Secret, JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import config, { get } from "config";

const SECRET_KEY: Secret = config.get("SECRET_KEY") as string;

export interface CustomRequest extends Request {
  token: string | JwtPayload;
}

const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header("Authorization");

    if (!token) {
      throw new Error();
    }

    const decoded = jwt.verify(token, SECRET_KEY);
    (req as CustomRequest).token = decoded;
    next();
  } catch (err) {
    res.status(401).send("Please authenticate");
  }
};

export default auth;
