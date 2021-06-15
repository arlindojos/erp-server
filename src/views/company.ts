import { companies } from "@prisma/client";
import { Address } from "./users";


export default {
  render(company: companies, address: Address) {
    if(address) {
      return {
        companyName: company.name,
        companyWebsite: company.website,
        employees: company.employees,
        created_at: company.created_at,
        companyProvince: address.provinces?.name,
        companyDistrict: address.districts?.name,
        companyBairro: address.bairro?.name,
        companyBlock: address.block,
        companyHouse: address.house
      }
    } else {

      return {
        companyName: company.name,
        companyWebsite: company.website,
        employees: company.employees,
        created_at: company.created_at
      };
    }
  }
}