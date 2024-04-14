import { Test, TestingModule } from '@nestjs/testing';
import { TableIngredientsController } from './table-ingredients.controller';

describe('TableIngredientsController', () => {
  let controller: TableIngredientsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TableIngredientsController],
    }).compile();

    controller = module.get<TableIngredientsController>(
      TableIngredientsController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
