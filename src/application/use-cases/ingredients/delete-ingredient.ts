import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { IngredientsRepository } from '@application/repositories/ingredients-repository';
import { EntityFactory } from '@helpers/EntitiesFactory';
import { RecipesWithIngredients } from '../recipes/get-with-props';

@Injectable()
export class DeleteIngredient {
  constructor(
    private ingredientsRepository: IngredientsRepository,
    private getRecipe: RecipesWithIngredients,
  ) {}

  async execute(recipeId: string, itemId: string) {
    try {
      const returnDb = await this.getRecipe.execute(+recipeId);

      if (!returnDb) throw new NotFoundException();

      const newRecipe = EntityFactory.deleteIngredient(
        +itemId,
        +recipeId,
        returnDb,
      );

      const newExpenses = EntityFactory.createExpensesEntity(
        +itemId,
        returnDb,
        newRecipe.valuePartial || 0,
      );

      await this.ingredientsRepository.delete(+itemId, newRecipe, newExpenses);
    } catch (error) {
      throw new BadRequestException();
    }
  }
}
