import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { UserRepository } from '@application/repositories/user-repository';
import { PrismaUserRepository } from './prisma/repositories/prisma-user-repository';
import { PrismaRecipesRepository } from './prisma/repositories/prisma-recipes-repository';
import { RecipesRepository } from '@application/repositories/recipes-repository';
import { PrismaIngredientsRepository } from './prisma/repositories/prisma-ingredients-repository';
import { IngredientsRepository } from '@application/repositories/ingredients-repository';
import { ProfileRepository } from '@application/repositories/profile-repository';
import { PrismaProfileRepository } from './prisma/repositories/prisma-profile-repository';

@Module({
  providers: [
    PrismaService,
    { provide: UserRepository, useClass: PrismaUserRepository },
    {
      provide: ProfileRepository,
      useClass: PrismaProfileRepository,
    },
    { provide: RecipesRepository, useClass: PrismaRecipesRepository },
    { provide: IngredientsRepository, useClass: PrismaIngredientsRepository },
  ],
  exports: [
    UserRepository,
    ProfileRepository,
    RecipesRepository,
    IngredientsRepository,
  ],
})
export class DatabaseModule {}
