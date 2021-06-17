import jwt from 'express-jwt';
import { config } from 'dotenv';
import dotenvExpand from 'dotenv-expand';

dotenvExpand(config());

export default jwt({
  secret: process.env.ACCESS_TOKEN_SECRET!, 
  algorithms: ["HS256"],
  getToken: req => console.log(req)
})