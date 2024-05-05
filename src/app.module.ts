import { Module } from '@nestjs/common';
import { IngredientsModule } from './ingredients/ingredients.module';
import { TableCostUnitModule } from './cost-unit/cost.unit.module';
import { UsersModule } from './users/users.module';
import { RecipesModule } from './recipes/recipes.module';
import { PrismaService } from './dataBase/prisma.service';

@Module({
  imports: [IngredientsModule, TableCostUnitModule, UsersModule, RecipesModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
