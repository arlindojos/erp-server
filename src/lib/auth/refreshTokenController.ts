import { Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import findAdminById from '../../entity/admin/findAdminById';
import { createRefreshToken, Payload } from './token';

const refreshTokenController = async (request: Request, response: Response) =>  {
    const authorization = request.headers['authorization'];

    if(!authorization)
    return response.status(401).send('Not authorized');

    const token = authorization.split(' ')[1];

    verify(
      token,
      process.env.REFRESH_TOKEN_SECRET!,

      {
        maxAge: '5s',
        algorithms: ['HS256']
      },

      (err, payload) => {
        if(err) 
        return response.status(403).send('');

        request.body = {
          ...request.body,
          admin: payload
        }

        const _payload = payload as unknown as Payload;

        findAdminById(_payload.id)
        .then(admin => {

          if(!admin) 
          return response.status(403).send('');

          const token = createRefreshToken(admin)

          response.status(200).json(token);
        })
      }
    )
  }

  export default refreshTokenController