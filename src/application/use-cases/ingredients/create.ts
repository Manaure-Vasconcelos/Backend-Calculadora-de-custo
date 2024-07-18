import { Injectable } from '@nestjs/common';
import { IngredientsRepository } from '@application/repositories/ingredients-repository';
import { IngredientEntity } from '@application/entities/ingredient.entity';
import { UpdateRecipe } from '../recipes/update';

interface IngredientRequest {
  name: string;
  usedWeight: number;
  marketPrice: number;
  grossWeight: number;
}

@Injectable()
export class CreateIngredient {
  constructor(
    private ingredientsRepository: IngredientsRepository,
    private saveRecipe: UpdateRecipe,
  ) {}

  async execute(
    recipeId: string,
    receivedValues: IngredientRequest,
  ): Promise<IngredientEntity> {
    const ingredient = new IngredientEntity({
      recipeId: +recipeId,
      name: receivedValues.name,
      marketPrice: receivedValues.marketPrice,
      grossWeight: receivedValues.grossWeight,
      usedWeight: receivedValues.usedWeight,
    });

    const createdIngredient =
      await this.ingredientsRepository.create(ingredient);

    await this.saveRecipe.execute({
      recipeId: createdIngredient.recipeId,
      title: undefined,
      describe: undefined,
    });

    return createdIngredient;
  }
}
