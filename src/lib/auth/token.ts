import { sign } from "jsonwebtoken";
import { companies_admins } from "@prisma/client";

export interface Payload {
  id: string, 
  isAdmin: boolean, 
  isOwner: boolean
}

export const createToken = (admin: companies_admins) => {
  const payload: Payload = {
    id: admin.id, 
    isAdmin: admin.admin, 
    isOwner: admin.owner
  }

  return sign(
    payload, 
    process.env.ACCESS_TOKEN_SECRET!,
    {
      expiresIn: '5s',
      algorithm: 'HS256'
    }
  )
}

export const createRefreshToken = (admin: companies_admins) => {
  const payload: Payload = {
    id: admin.id, 
    isAdmin: admin.admin, 
    isOwner: admin.owner
  }

  return sign(
    payload, 
    process.env.ACCESS_TOKEN_SECRET!,
    {
      expiresIn: '7d',
      algorithm: 'HS256'
    }
  )
}