import { Module } from '@nestjs/common';
import { IngredientsModule } from './ingredients/ingredients.module';
import { TableCostUnitModule } from './application/use-cases/cost-unit/cost.unit.module';
import { UsersModule } from './users/users.module';
import { RecipesModule } from './recipes/recipes.module';
import { PrismaService } from './dataBase/prisma.service';
import { UserRepository } from './application/repositories/user-repository';
import { PrismaUserRepository } from './infra/dataBase/prisma/repositories/prisma-user-repository';

@Module({
  imports: [IngredientsModule, TableCostUnitModule, UsersModule, RecipesModule],
  controllers: [],
  providers: [
    PrismaService,
    { provide: UserRepository, useClass: PrismaUserRepository },
  ],
})
export class AppModule {}
