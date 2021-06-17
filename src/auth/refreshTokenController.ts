import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { verify } from 'jsonwebtoken';
import { createAccessToken, createRefreshToken } from '../views/auth/auth';
import sendToken from '../lib/auth/sendToken';

const prisma = new PrismaClient();

export default {
  async refresh(request: Request, response: Response) {
    const accessToken = request.cookies.grid;

    if(!accessToken)
    return response.status(401).send('');

    let payload: any = null;
    try {
      payload = verify(accessToken, process.env.REFRESH_TOKEN_SECRET!)
    } catch(err) {
      console.log(err);
      return response.status(401).send('');
    }

    const superUser = await prisma.super_users.findUnique({
      where: { id: payload.id }
    });

    if(!superUser)
    return response.status(403).send('');

    if(superUser.token_version !== payload.tokenVersion)
    return response.status(401).send('');

    sendRefreshToken(response, createRefreshToken(superUser));
    response.status(200).json({accessToken: createAccessToken(superUser)});
  },
}