import { PrismaClient } from "@prisma/client"
import createOrConnectBairro from "./createOrConnectBairro";

const prisma = new PrismaClient();

export interface Address {
  provinceId: number
  districtId: number
  bairro: string
  block: number | undefined
  house: number | undefined
}

const createAddress = async (address: Address) => {

  const bairro = await createOrConnectBairro(
    address.bairro, 
    address.districtId
  )

  const newAddress = await prisma.address.create({

    data: {
      
      province_id: address.provinceId,

      district_id: address.districtId,
      
      bairro_id: bairro.id,

      block: address.block && address.block,

      house: address.house && address.house,
    }

  });

  return newAddress;
}

export default createAddress;