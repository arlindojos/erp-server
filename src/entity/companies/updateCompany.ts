import { companies, PrismaClient, users } from "@prisma/client"

const prisma = new PrismaClient();

const updateCompany = async (company: companies, teamMember: users) => {
  const savedCompany = await prisma.companies.update({

    where: { name: company.name },

    data: {
      employees: company.employees,

      website: company.website,

      company_team: {

        connectOrCreate: {

          where: { email: teamMember.email },

          create: {

            name: teamMember.name,

            email: teamMember.email,

            tel: teamMember.tel

          }
        }
      }
    }, 
    include: { address: true }
  }); 

  return savedCompany;
}

export default updateCompany;