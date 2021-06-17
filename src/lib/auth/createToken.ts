import { sign } from "jsonwebtoken";
import { companies_admins } from "@prisma/client";

export const createAccessToken = (admin: companies_admins) => {
  return sign({
    id: admin.id, 
    admin: admin.admin, 
    owner: admin.owner
  }, 
  process.env.ACCESS_TOKEN_SECRET!,
  {
    expiresIn: '60m'
  })
}