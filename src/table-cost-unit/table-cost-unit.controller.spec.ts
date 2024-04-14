import { Test, TestingModule } from '@nestjs/testing';
import { TableCostUnitController } from './table-cost-unit.controller';

describe('TableCostUnitController', () => {
  let controller: TableCostUnitController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TableCostUnitController],
    }).compile();

    controller = module.get<TableCostUnitController>(TableCostUnitController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
