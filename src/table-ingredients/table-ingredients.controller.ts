import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { IngredientDTO } from '../interfaces/ingredient-service-dto';
import { TableIngredientsService } from './table-ingredients.service';

@Controller('/ingredients')
export class TableIngredientsController {
  constructor(
    private readonly tableIngredientsService: TableIngredientsService,
  ) {}

  @Post()
  createIngredient(@Body() ingredient: IngredientDTO) {
    this.tableIngredientsService.createIngredient(ingredient);
    return 'Adicionando um ingrediente';
  }

  @Get()
  getAllIngredients() {
    return this.tableIngredientsService.getAllIngredients();
  }

  @Get('/:id')
  getIngredient(@Param('id') id: string) {
    console.log(id, typeof id);
    return this.tableIngredientsService.getIngredient(parseInt(id));
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
