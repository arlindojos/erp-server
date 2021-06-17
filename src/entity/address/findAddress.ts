import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

const findAddress = async (id: number | null) => {
  if(!id) return null
  
  const address = await prisma.address.findUnique({
    where: { id },
    include: {
      provinces: true,
      districts: true,
      bairro: true
    }
  });

  return address;
}

export default findAddress;