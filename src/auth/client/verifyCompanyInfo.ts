import { NextFunction, Request, Response } from "express";
import Name from "../../validations/name";
import EmployeesNumber from "../../validations/employeesNumber";
import Url from "../../validations/url";
import { sign, verify } from "jsonwebtoken";
import redis from 'redis';

const redisClient = redis.createClient();

const verifyCompanyInfo = (request: Request, response: Response, next: NextFunction) => {
  const { companyName, website, employees } = request.body;

  const bearerHeader = request.headers['authorization'];

  if (typeof bearerHeader === "undefined") {
    return response.status(401).json({message: 'Not authorized'})
  }

  let payload: any = null;
  
  try {
    const bearerToken = bearerHeader.split(' ')[1];

    payload = verify(bearerToken, process.env.ACCESS_TOKEN_SECRET!)
  } catch(err) {
    console.log(err);
    return response.status(401).json({message: 'Not authorized'})
  }
  
  
  if(payload.sign === 1) {
    
    const validCompanyName = Name.create( companyName);
    if(typeof validCompanyName !==  'string') {
      return response.status(400).json(validCompanyName.message)
    }

    let validWebsiteUrl: string | Error;

    if(website) {
      validWebsiteUrl = Url.create(website);
      if(typeof validWebsiteUrl !==  'string') {
        return response.status(400).json(validWebsiteUrl.message)
      }
    }

    const validEmployeesNumber = EmployeesNumber.create(employees);
    if(typeof validEmployeesNumber !==  'string') {
      return response.status(400).json(validEmployeesNumber.message)
    }
    
    redisClient.get(payload.id, (error, user) => {

      if(error || !user) {

        console.log(error);

        return response.status(401).json({message: 'Not authorized'})
      }

      const prevData = JSON.parse(user);
      
      const data = {
        ...prevData,
        companyName: validCompanyName,
        website: validWebsiteUrl,
        employees: validEmployeesNumber
      }
      
      const deleteUser = async () => {
        return redisClient.DEL(payload.id);
      }
      
      deleteUser()
      .then(() => {
        
        redisClient.set(payload.id, JSON.stringify(data));
        redisClient.EXPIRE(payload.id, 1000 * 60 * 60 * 24);

        const token = sign(
          {
            id: payload.id,
            sign: 2,
          },
          process.env.ACCESS_TOKEN_SECRET!, 
          {
            expiresIn: '24h'
          }
        )
        
        response.status(201).json({token});
      })
      .catch(error => {

        return response.status(400).json(error);

      })

    });

    return
  }


  if(payload.sign === 2) {

    redisClient.get(payload.id, (error, user) => {
      
      if(error || !user) {
        return response.status(401).json({message: 'Not authorized'})
      }

      const prevData = JSON.parse(user);

      request.body = {
        ...request.body,
        ...prevData
      }

      next();
    })

    return

  } 

  response.status(401).json({message: 'Not authorized'});
}


export default verifyCompanyInfo;