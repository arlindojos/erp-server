import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

const findUser = async (id: string) => {
  const user = await prisma.users.findUnique({
    where: { id },
    include: {address: true}
  });

  return user;
}

export default findUser;