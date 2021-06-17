import { Request, Response } from 'express';


export default {
  async create(request: Request, response: Response) { 
    const { name } = request.body;

    console.log(name);

    response.json(name)
    
  }
}  