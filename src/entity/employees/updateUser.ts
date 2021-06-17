import {  PrismaClient, users } from "@prisma/client"
import createAddress, { Address } from "../address/createAddress";
import updateAddress from "../address/updateAddress";

const prisma = new PrismaClient();


interface UserAddress extends Address {
  id: number | null
}



const updateUser = async (user: users, address: UserAddress) => {

  if(address.id) {
    
    const updatedAddress = await updateAddress({
      id: address.id,
      provinceId: address.provinceId,
      districtId: address.districtId,
      bairro: address.bairro,
      block: address.block,
      house: address.house
    });

    const updatedUser = await update(user, updatedAddress.id);

    return updatedUser;
  }

  const newAddress = await createAddress({
    provinceId: address.provinceId,
    districtId: address.districtId,
    bairro: address.bairro,
    block: address.block,
    house: address.house
  })

  const updatedUser = await update(user, newAddress.id);

  return updatedUser;

}



const update = async (user: users, addressId: number) => {

  return await prisma.users.update({
    where: {
      email: user.email
    },

    data: {

      name: user.name,

      email: user.email,

      tel: user.tel,

      address_id: addressId,
      
      updated_at: new Date
    }
  });
}

export default updateUser;