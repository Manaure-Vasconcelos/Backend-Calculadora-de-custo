import { Module } from '@nestjs/common';
import { TableCostUnitController } from './cost.unit.controller';
import { TableCostUnitService } from './cost.unit.service';

@Module({
  imports: [],
  controllers: [TableCostUnitController],
  providers: [TableCostUnitService],
})
export class TableCostUnitModule {}
