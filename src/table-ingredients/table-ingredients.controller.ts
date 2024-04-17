import { Body, Controller, Get, Post } from '@nestjs/common';
import { TableIngredientsService } from './table-ingredients.service';
import { IngredientServiceDTO } from '../interfaces/ingredient-service-dto';

@Controller('table-ingredients')
export class TableIngredientsController {
  constructor(
    private readonly tableIngredientsService: TableIngredientsService,
  ) {}

  @Post('/ingredients')
  createIngredient(@Body() ingredient: IngredientServiceDTO) {
    this.tableIngredientsService.createIngredient(ingredient);
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
