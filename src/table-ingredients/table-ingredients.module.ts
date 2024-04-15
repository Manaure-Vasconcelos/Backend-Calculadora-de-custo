import { Module } from '@nestjs/common';
import { TableIngredientsController } from './table-ingredients.controller';
import { IngredientService } from '../ingredient/ingredient.service';
import { TableIngredientsService } from './table-ingredients.service';

@Module({
  controllers: [TableIngredientsController],
  providers: [IngredientService, TableIngredientsService],
})
export class TableIngredientsModule {}
