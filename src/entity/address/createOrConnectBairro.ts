import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

const createOrConnectBairro = async (bairroName: string, districtId: number) => {

  const bairro = await prisma.bairros.findUnique({

    where: {
      name: bairroName
    }

  })


  if(bairro) return bairro;


  const newBairro = await prisma.bairros.create({
    
    data: {
      
      name: bairroName,
      
      district_id: districtId
    }
  })

  return newBairro;
}

export default createOrConnectBairro;