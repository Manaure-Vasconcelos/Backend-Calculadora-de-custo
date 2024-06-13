import { Injectable } from '@nestjs/common';
import { IngredientsRepository } from '@application/repositories/ingredients-repository';
import { UpdatingValuePartial } from '@application/use-cases/recipes/update-value-partial';
import { IngredientEntity } from '@application/entities/ingredient.entity';

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
    private updatingValuePartial: UpdatingValuePartial,
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

    /*   await this.updatingValuePartial.execute(createdIngredient.id); */

    return createdIngredient;
  }
}
