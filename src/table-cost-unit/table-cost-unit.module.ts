import { Module } from '@nestjs/common';
import { TableCostUnitController } from './table-cost-unit.controller';
import { TableCostUnitService } from './table-cost-unit.service';
import { IngredientsService } from '../table-ingredients/ingredients.service';

@Module({
  imports: [],
  controllers: [TableCostUnitController],
  providers: [TableCostUnitService, IngredientsService],
})
export class TableCostUnitModule {}
