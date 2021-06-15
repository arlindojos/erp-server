import { Response } from "express";

const sendToken = (response: Response, token: string) => {
  return response.cookie('grid', token, {httpOnly: true, maxAge: 60 * 60 * 24});
}

export default sendToken;