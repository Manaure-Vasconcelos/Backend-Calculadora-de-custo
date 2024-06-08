import { RecipeEntity } from '@application/entities/recipe.entity';
import { Injectable } from '@nestjs/common';
import { RecipesRepository } from 'src/application/repositories/recipes-repository';

@Injectable()
export class UpdatingValuePartial {
  // sempre ao criar e atualizar ser chamado.
  constructor(private recipesRepository: RecipesRepository) {}

  async execute(recipeId: number): Promise<void> {
    const currentRecipe = await this.recipesRepository.getRecipe(recipeId);

    if (!currentRecipe.props.ingredients) {
      throw new Error('nao tem nada');
    }
    const { ingredients } = currentRecipe;
    const valuePartial = ingredients.reduce(
      (total: number, ingredient: any) =>
        total + parseFloat(ingredient.realAmount),
      0,
    );

    const newRecipe = new RecipeEntity({
      id: currentRecipe.id,
      title: currentRecipe.title,
      describe: currentRecipe.describe,
      userId: currentRecipe.userId,
      valuePartial: valuePartial,
      ingredients: currentRecipe.Ingredients,
      createAt: currentRecipe.createAt,
    });

    await this.recipesRepository.update(newRecipe);
  }
}
