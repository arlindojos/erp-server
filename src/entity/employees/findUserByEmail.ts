import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

const findUser = async (email: string) => {
  const user = await prisma.users.findUnique({
    where: { email },
    include: {
      genders: true
    }
  });

  return user;
}

export default findUser;