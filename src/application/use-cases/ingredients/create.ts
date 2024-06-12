import { Injectable } from '@nestjs/common';
import { IngredientsRepository } from '@application/repositories/ingredients-repository';
import { IngredientResponse } from '@common/interfaces/ingredientResponse';
import { UpdatingValuePartial } from '@application/use-cases/recipes/update-value-partial';
import { IngredientEntity } from '@application/entities/ingredient.entity';

interface IngredientRequest {
  name: string;
  marketWeight: number;
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
  ): Promise<IngredientResponse> {
    /* const realAmount = this.realAmount.calculate(receivedValues); */

    const ingredient = new IngredientEntity({
      recipeId: +recipeId,
      name: receivedValues.name,
      marketPrice: receivedValues.marketPrice,
      grossWeight: receivedValues.grossWeight,
      usedWeight: receivedValues.marketWeight,
    });

    const createdIngredient =
      await this.ingredientsRepository.create(ingredient);

    await this.updatingValuePartial.execute(ingredient.id);

    return createdIngredient;
  }
}
