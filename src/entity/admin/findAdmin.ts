import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

const findAdmin = async (email: string) => {
  return await prisma.companies_admins.findUnique({
    where: { email }
  });
}

export default findAdmin;