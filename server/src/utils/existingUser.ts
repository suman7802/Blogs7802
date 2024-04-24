import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

export default async function existingUser(email: string) {
  return await prisma.user.findUnique({where: {email}});
}
