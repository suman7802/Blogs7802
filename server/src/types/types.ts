import {Prisma} from '@prisma/client';

declare global {
  namespace Express {
    export interface User extends Prisma.UserFieldRefs {}
    export interface Blog extends Prisma.BlogFieldRefs {}
  }
}
