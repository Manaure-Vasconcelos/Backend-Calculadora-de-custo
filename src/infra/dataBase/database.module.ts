import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { UserRepository } from 'src/application/repositories/user-repository';
import { PrismaUserRepository } from './prisma/repositories/prisma-user-repository';
import { PrismaRecipesRepository } from './prisma/repositories/prisma-recipes-repository';
import { RecipesRepository } from 'src/application/repositories/recipes-repository';
import { PrismaIngredientsRepository } from './prisma/repositories/prisma-ingredients-repository';
import { IngredientsRepository } from 'src/application/repositories/ingredients-repository';

@Module({
  providers: [
    PrismaService,
    { provide: UserRepository, useClass: PrismaUserRepository },
    { provide: RecipesRepository, useClass: PrismaRecipesRepository },
    { provide: IngredientsRepository, useClass: PrismaIngredientsRepository },
  ],
  exports: [UserRepository, RecipesRepository],
})
export class DatabaseModule {}
