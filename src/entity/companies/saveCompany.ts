import { companies, PrismaClient, users } from "@prisma/client"

const prisma = new PrismaClient();

const saveCompany = async (company: companies, teamMember: users) => {
  const savedCompany = await prisma.companies.create({
    data: {
      name: company.name,
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

export default saveCompany;