import { NextFunction, Request, Response } from "express";
import Name from "../../../../validations/name";

const adminValidator = (
  request: Request, 
  response: Response, 
  next: NextFunction
) => {
  const { name, description, provinceId, districtId, addressT } = request.body;

  const validName = Name.create(name);
  if(typeof validName !==  'string') {
    return response.status(400).json(validName.message)
  }

  const validDescription = Name.create(description);
  if(typeof validDescription !==  'string') {
    return response.status(400).json(validDescription.message)
  } 
  
  const validAddressT = Name.create(addressT);
  if(typeof validAddressT !==  'string') {
    return response.status(400).json(validAddressT.message)
  }


  request.body = {
    ...request.body,
    name: validName, 
    description: validDescription, 
    addressT: validAddressT,
    provinceId, 
    districtId, 
  }

  next();
}

export default adminValidator;