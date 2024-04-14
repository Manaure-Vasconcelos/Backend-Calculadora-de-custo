import { Module } from '@nestjs/common';
import { TableIngredientsModule } from './table-ingredients/table-ingredients.module';
import { IngredientModule } from './ingredient/ingredient.module';
import { TableCostUnitModule } from './table-cost-unit/table-cost-unit.module';

@Module({
  imports: [TableIngredientsModule, IngredientModule, TableCostUnitModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
