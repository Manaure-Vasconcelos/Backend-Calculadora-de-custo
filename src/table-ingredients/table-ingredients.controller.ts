import { Controller, Get } from '@nestjs/common';

@Controller('table-ingredients')
export class TableIngredientsController {
  @Get()
  getValuePartialOfRecipe() {
    return 'Obtendo valor parcial da receita.';
  }

  @Get('/ingredients')
  getIngredients() {
    return 'Obtendo os ingredients da receita.';
  }
}
