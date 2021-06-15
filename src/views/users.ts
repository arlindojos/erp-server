import { address, bairros, districts, genders, provinces, users } from "@prisma/client";


interface User extends users {
  genders: genders | null
}

export type Address = (address & {
    provinces: provinces | null;
    districts: districts | null;
    bairro: bairros | null;
}) | null

export default {
  render(user: User, address: Address ) {
    if(address) {
      return {
        name: user.name,
        email: user.email,
        tel: user.tel,
        gender: user.genders?.gender,
        education: user.education,
        profession: user.profession,
        province: address?.provinces?.name,
        district: address.districts?.name,
        bairro: address.bairro?.name,
        block: address.block,
        house: address.house
      };
    } else {
      return {
        name: user.name,
        email: user.email,
        tel: user.tel,
        gender: user.genders?.gender,
        education: user.education,
        profession: user.profession,
      };
    }
  }
}