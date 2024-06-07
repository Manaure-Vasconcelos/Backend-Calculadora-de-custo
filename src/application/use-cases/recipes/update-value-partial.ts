import { Injectable } from '@nestjs/common';
import { RecipesRepository } from 'src/application/repositories/recipes-repository';

@Injectable()
export class UpdatingValuePartial {
  // sempre ao criar e atualizar ser chamado.
  constructor(private recipesRepository: RecipesRepository) {}

  async execute(recipeId: number): Promise<void> {
    const recipe = await this.recipesRepository.getRecipe(recipeId);

    if (!recipe.props.ingredients) {
      throw new Error('nao tem nada');
    }
    const { ingredients } = recipe;
    const valuePartial = ingredients.reduce(
      (total: number, ingredient: any) =>
        total + parseFloat(ingredient.realAmount),
      0,
    );

  /*   await this.recipesRepository.update(recipeId, {
      ...recipe,
      valuePartial,
    }); */
  }
}
