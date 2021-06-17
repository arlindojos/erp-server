import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

const findCompany = async (name: string) => {
  const company = await prisma.companies.findUnique({
    where: { name },
    include: { address: true }
  });

  return company;
}

export default findCompany;