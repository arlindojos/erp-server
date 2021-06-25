import { Request, Response } from 'express';
import axios from 'axios';
import oauth2Client from '../../../../lib/auth/googleapis';


const scopes = [
  'https://www.googleapis.com/auth/auth/userinfo.email',
  'https://www.googleapis.com/auth/auth/userinfo.profile'
];

export default {
  async create(request: Request, response: Response) { 
    const url = oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: scopes
    });


    axios.get(url).then(response => console.log(response.data))
    .catch(err => console.log(err))
    
  }
}  