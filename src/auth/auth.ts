import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

const auth = (
  request: Request, 
  response: Response, 
  next: NextFunction
) => {
  
  next()
}

export default auth;