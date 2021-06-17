import { NextFunction, Request, Response } from "express";
import { verifyAccessToken } from "../lib/auth/token";

const isOwner = (
  request: Request, 
  response: Response, 
  next: NextFunction
) => {
  const token = request.cookies.dreams;

  if(!token)
  return response.status(401).send('Not authorized');

  const payload = verifyAccessToken(token);

  console.log(payload);
  
  next();
}

export default isOwner;