import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

const auth = (
  request: Request, 
  response: Response, 
  next: NextFunction
) => {
  const authorization = request.headers['authorization']

  if(!authorization)
  return response.status(401).send('Not authorized');

  const token = authorization.split(' ')[1];

  verify(
      token,
      process.env.ACCESS_TOKEN_SECRET!,

    {
      maxAge: '5s',
      algorithms: ['HS256']
    },

    (err, payload) => {
      if(err) 
      return response.status(403).send('You have no permission');

      request.body = {
        ...request.body,
        admin: payload
      }

      next()
    }
  )
}

export default auth;