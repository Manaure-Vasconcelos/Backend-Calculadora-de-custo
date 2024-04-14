import { Module } from '@nestjs/common';
import { TableCostUnitController } from './table-cost-unit.controller';
import { TableCostUnitService } from './table-cost-unit.service';

@Module({
  controllers: [TableCostUnitController],
  providers: [TableCostUnitService],
})
export class TableCostUnitModule {}
