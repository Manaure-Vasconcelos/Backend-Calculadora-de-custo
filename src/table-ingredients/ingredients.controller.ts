import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { IngredientDTO } from './DTO/ingredient-dto';
import { IngredientsService } from './ingredients.service';

@Controller('/ingredients')
export class IngredientsController {
  constructor(private readonly ingredientsService: IngredientsService) {}

  @Post()
  createIngredient(@Body() ingredient: IngredientDTO) {
    this.ingredientsService.createIngredient(ingredient);
    return 'Adicionando um ingrediente';
  }

  @Get()
  getAllIngredients() {
    return this.ingredientsService.getAllIngredients();
  }

  @Get('/:id')
  getIngredient(@Param('id') id: string) {
    console.log(id, typeof id);
    return this.ingredientsService.getIngredient(parseInt(id));
  }

  @Post()
  setValuePartial() {
    this.ingredientsService.setValuePartialOfRecipe();
    return 'Adicionando valor parcial.';
  }

  @Get('/value-partial')
  getValuePartialOfRecipe() {
    return this.ingredientsService.getValuePartialOfRecipe();
  }
}
