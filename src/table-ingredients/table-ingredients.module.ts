import { Module } from '@nestjs/common';
import { TableIngredientsController } from './table-ingredients.controller';
import { TableIngredientsService } from './table-ingredients.service';

@Module({
  controllers: [TableIngredientsController],
  providers: [TableIngredientsService],
})
export class TableIngredientsModule {}
