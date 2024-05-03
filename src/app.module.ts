import { Module } from '@nestjs/common';
import { IngredientsModule } from './table-ingredients/ingredients.module';
import { TableCostUnitModule } from './table-cost-unit/table-cost-unit.module';
import { UsersModule } from './users/users.module';
import { RecipesModule } from './recipes/recipes.module';
import { PrismaService } from './dataBase/prisma.service';

@Module({
  imports: [IngredientsModule, TableCostUnitModule, UsersModule, RecipesModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
