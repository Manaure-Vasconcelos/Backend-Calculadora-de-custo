import { Module } from '@nestjs/common';
import { TableIngredientsModule } from './table-ingredients/ingredients.module';
import { TableCostUnitModule } from './table-cost-unit/table-cost-unit.module';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { UsersModule } from './users/users.module';
import { RecipesModule } from './recipes/recipes.module';

@Module({
  imports: [TableIngredientsModule, TableCostUnitModule, UsersModule, RecipesModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class AppModule {}
