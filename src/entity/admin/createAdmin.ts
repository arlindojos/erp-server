import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

interface Admin {
  name: string 
  lastName: string
  email: string
  tel: string
  owner: boolean
  admin: boolean
}

const createAdmin = async ({
  name,
  lastName,
  email,
  tel,
  owner,
  admin
}: Admin) => {

  return await prisma.companies_admins.create({
    data: {
      name,
      l_name: lastName,
      email,
      tel,
      owner,
      admin
    }
  });
}

export default createAdmin;