import { PrismaClient, users } from "@prisma/client"

const prisma = new PrismaClient();

const createTeamMember = async (user: users, id: string) => {
  const newTeamMember = await prisma.users.create({
    data: {
      name: user.name,
      email: user.email,
      tel: user.tel,
      companies: {
        connect: {id}
      }
    }
  });

  return newTeamMember;
}

export default createTeamMember;