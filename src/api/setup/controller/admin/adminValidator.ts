import { NextFunction, Request, Response } from "express";
import Email from "../../../../validations/email";
import Name from "../../../../validations/name";
import PhoneNumber from "../../../../validations/phone";

const adminValidator = (
  request: Request, 
  response: Response, 
  next: NextFunction
) => {
  const { name, lastName, email, tel } = request.body;

  const validName = Name.create(name);
  if(typeof validName !==  'string') {
    return response.status(400).json(validName.message)
  }

  const validLastName = Name.create(lastName);
  if(typeof validLastName !==  'string') {
    return response.status(400).json(validLastName.message)
  }

  const validEmail = Email.create(email);
  if(typeof validEmail !==  'string') {
    return response.status(400).json(validEmail.message)
  }

  const validPhoneNumber = PhoneNumber.create(tel);
  if(typeof validPhoneNumber !==  'string') {
    return response.status(400).json(validPhoneNumber.message)
  }

  request.body = {
    ...request.body,
    email: validEmail, 
    name: validName,
    lastName: validLastName,
    tel: validPhoneNumber
  }

  next();
}

export default adminValidator;