import { Module } from '@nestjs/common';
import { TableCostUnitController } from './table-cost-unit.controller';
import { TableCostUnitService } from './table-cost-unit.service';
import { TableIngredientsService } from '../table-ingredients/table-ingredients.service';

@Module({
  imports: [],
  controllers: [TableCostUnitController],
  providers: [TableCostUnitService, TableIngredientsService],
})
export class TableCostUnitModule {}
