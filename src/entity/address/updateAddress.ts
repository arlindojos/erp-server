import { PrismaClient } from "@prisma/client"
import { Address } from "./createAddress";
import createOrConnectBairro from "./createOrConnectBairro";

const prisma = new PrismaClient();

interface UpAddress extends Address {
  id: number
}

const updateAddress = async (address: UpAddress) => {

  const bairro = await createOrConnectBairro(
    address.bairro, 
    address.districtId
  )

  const updatedAddress = await prisma.address.update({

    where: { 
      id: address.id 
    },

    data: {
      province_id: address.provinceId,

      district_id: address.districtId,
      
      bairro_id: bairro.id,

      block: address.block && address.block,

      house: address.house && address.house,

      updated_at: new Date
    }

  });

  return updatedAddress;
}

export default updateAddress;