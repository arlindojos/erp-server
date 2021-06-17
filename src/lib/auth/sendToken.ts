import { Response } from "express";

const sendToken = (response: Response, token: string) => {
  return response.cookie('dreams', token, {httpOnly: true, maxAge: 60 * 60});
}

export default sendToken;