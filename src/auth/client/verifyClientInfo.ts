import { NextFunction, Request, Response } from "express";
import { sign } from "jsonwebtoken";
import {v4 as uuidV4} from 'uuid';
import redis from 'redis';

import Email from "../../validations/email";
import Name from "../../validations/name";
import Service from "../../validations/service";
import PhoneNumber from "../../validations/phone";

const redisClient = redis.createClient();

export interface Session {
  clientName: string
  email: string
  phone: string
  service: string
  companyName: string
  website: string
  employees: number
}

const verifyClientInfo = (
  request: Request, 
  response: Response, 
  next: NextFunction
) => {

  const { name, email, phone, service } = request.body;
  
  const bearerHeader = request.headers['authorization'];

  if (typeof bearerHeader === "undefined") {

    const validName = Name.create(name);
    if(typeof validName !==  'string') {
      return response.status(400).json(validName.message)
    }

    const validService = Service.create(service);
    if(typeof validService !==  'string') {
      return response.status(400).json(validService.message)
    }

    const validPhoneNumber = PhoneNumber.create(phone);
    if(typeof validPhoneNumber !==  'string') {
      return response.status(400).json(validPhoneNumber.message)
    }

    const validEmail = Email.create(email);
    if(typeof validEmail !==  'string') {
      return response.status(400).json(validEmail.message)
    }
    
    const data =  JSON.stringify({
      clientName: validName,
      email: validEmail,
      phone: validPhoneNumber,
      service: validService
    })

    const id = uuidV4();

    const token = sign({id, sign: 1,}, process.env.ACCESS_TOKEN_SECRET!, {expiresIn: '24h'})

    redisClient.set(id, data, (err) => {
      if(err) return console.log(err)
    });

    redisClient.EXPIRE(id, 1000 * 60 * 60 * 24);
    
    return response.status(201).json({token});
  }


  next();
}

export default verifyClientInfo;