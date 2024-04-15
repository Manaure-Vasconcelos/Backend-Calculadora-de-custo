import { Controller, Get, Post } from '@nestjs/common';
import { IngredientProtocol } from '../interfaces/ingredient-protocol';
import { TableIngredientsService } from './table-ingredients.service';

@Controller('table-ingredients')
export class TableIngredientsController {
  constructor(
    private readonly tableIngredientsService: TableIngredientsService,
  ) {}

  @Post('/ingredients')
  setIngredient(ingredient: IngredientProtocol) {
    this.tableIngredientsService.setIngredient(ingredient);
    return 'Adicionando um ingrediente';
  }

  @Get('/ingredients')
  getIngredients() {
    return this.tableIngredientsService.getIngredients();
  }

  @Post()
  setValuePartial() {
    this.tableIngredientsService.setValuePartialOfRecipe();
    return 'Adicionando valor parcial.';
  }

  @Get('/value-partial')
  getValuePartialOfRecipe() {
    return this.tableIngredientsService.getValuePartialOfRecipe();
  }
}
