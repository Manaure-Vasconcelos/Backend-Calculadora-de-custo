import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { IngredientsRepository } from '@application/repositories/ingredients-repository';
import { RecipesRepository } from '@application/repositories/recipes-repository';
import { EntityFactory } from '@helpers/EntitiesFactory';

@Injectable()
export class DeleteIngredient {
  constructor(
    private ingredientsRepository: IngredientsRepository,
    private recipesRepository: RecipesRepository,
  ) {}

  async execute(recipeId: string, itemId: string) {
    try {
      const returnDb = await this.recipesRepository.getRecipeProps(+recipeId);

      if (!returnDb) throw new NotFoundException();

      const newRecipe = EntityFactory.deleteRecipeEntity(
        +itemId,
        +recipeId,
        returnDb,
      );

      const newExpenses = EntityFactory.createExpensesEntity(
        +itemId,
        returnDb,
        newRecipe.valuePartial || 0,
      );

      newExpenses.calculateValueTotal();

      await this.ingredientsRepository.delete(+itemId, newRecipe, newExpenses);
    } catch (error) {
      throw new BadRequestException();
    }
  }
}
