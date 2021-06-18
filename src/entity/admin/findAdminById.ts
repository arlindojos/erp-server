import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

const findAdminById = async (id: string) => {
  return await prisma.companies_admins.findUnique({
    where: { id }
  });
}

export default findAdminById;