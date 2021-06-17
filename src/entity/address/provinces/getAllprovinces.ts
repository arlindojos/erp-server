import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

const getAllProvinces = async () => {

  const provinces = await prisma.provinces.findMany({

    select: {
      id: true,
      name: true,

      districts: {
        select: {
          id: true,
          name: true
        }
      }
    },
  })  

  return provinces;
}



export default getAllProvinces;