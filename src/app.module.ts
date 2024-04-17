import { Module } from '@nestjs/common';
import { TableIngredientsModule } from './table-ingredients/table-ingredients.module';
import { TableCostUnitModule } from './table-cost-unit/table-cost-unit.module';

@Module({
  imports: [TableIngredientsModule, TableCostUnitModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
