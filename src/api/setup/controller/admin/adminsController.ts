import { Request, Response } from 'express';
import createAdmin from '../../../../entity/admin/createAdmin';
import findAdmin from '../../../../entity/admin/findAdmin';
import { createAccessToken } from '../../../../lib/auth/token';


export default {
  async create(request: Request, response: Response) { 
     const { name, lastName, email, tel } = request.body;

    const admin = await findAdmin(email);

    if(admin)
    return response.status(400).json({error: 'Email already in use'});

    const newAdmin = await createAdmin({
      name, 
      lastName, 
      email,
      tel,
      owner: true,
      admin: true
    })

    const token = createAccessToken(newAdmin);

    response.cookie(
      'dreams', 
      token, 
      { httpOnly: true, maxAge: 60 * 60 }
    );

    response.status(201).json(token);
  },

  async index(request: Request, response: Response) { 
    const admin = await findAdmin('arlindojosboa@gmail.com');

    if(!admin)
    return response.status(404).json({error: 'Admin not found' });
    
    const token = createAccessToken(admin);

    response.cookie(
      'dreams', 
      token, 
      { 
        httpOnly: true, 
        maxAge: 60 * 60
      }
    );

    response.status(201).json(token);
  }
}  