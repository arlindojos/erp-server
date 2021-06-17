import { PrismaClient, users } from "@prisma/client"
import createAddress, { Address } from "../address/createAddress";

const prisma = new PrismaClient();


const createUser = async (user: users, address: Address | null) => {

  if(!address) {
    const newUser = await create(user, undefined);

    return newUser;
  }

  
  const newAddress = await createAddress(address);

  const newUser = await create(user, newAddress.id);

  return newUser;
}


const create = async (user: users, addressId: number | undefined) => {

  const newUser = await prisma.users.create({

    data: {

      name: user.name,

      email: user.email,

      tel: user.tel,

      address_id: addressId

    }
  });

  return newUser;
}

export default createUser;