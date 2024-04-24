import {Prisma} from '@prisma/client';

declare global {
  namespace Express {
    export interface User extends Prisma.UserFieldRefs {}
    export interface Blog extends Prisma.BlogFieldRefs {}
    export interface Like extends Prisma.LikeFieldRefs {}
    export interface Favorite extends Prisma.FavoriteFieldRefs {}
  }
}
