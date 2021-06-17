import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

const findProvince = async (id: number) => {

  const province = await prisma.provinces.findUnique({

    where: { id },

    include: {
      districts: true
    }
    
  });
 
  return province;
}

export default findProvince;