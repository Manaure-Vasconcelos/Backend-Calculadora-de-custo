import { Module } from '@nestjs/common';
import { TableCostUnitController } from './cost.unit.controller';
import { TableCostUnitService } from './cost.unit.service';
import { IngredientsService } from '../ingredients/ingredients.service';

@Module({
  imports: [],
  controllers: [TableCostUnitController],
  providers: [TableCostUnitService, IngredientsService],
})
export class TableCostUnitModule {}
