import { Request, Response } from 'express';
import createAdmin from '../../../../entity/admin/createAdmin';
import findAdmin from '../../../../entity/admin/findAdmin';


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

    // const token = createToken(newAdmin);

    // response.cookie(
    //   'token', 
    //   token, 
    //   { httpOnly: true, maxAge: 60 * 60 }
    // );

    response.status(201).json(newAdmin);
  },
}  