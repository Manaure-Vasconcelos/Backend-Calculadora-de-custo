import { Injectable } from '@nestjs/common';
import { IngredientsRepository } from 'src/application/repositories/ingredients-repository';
import { UpdatingValuePartial } from '../recipes/update-value-partial';
import { IngredientEntity } from '@application/entities/ingredient.entity';

interface IngredientUpdatingRequest {
  name?: string;
  marketPrice?: number;
  grossWeight?: number;
  marketWeight?: number;
}

@Injectable()
export class UpdateIngredient {
  constructor(
    private ingredientsRepository: IngredientsRepository,
    private updatingValuePartial: UpdatingValuePartial,
  ) {}

  async execute(receivedId: string, receivedValues: IngredientUpdatingRequest) {
    const ingredient = new IngredientEntity({
      recipeId: +receivedId,
      name: receivedValues.name as unknown as string,
      marketPrice: receivedValues.marketPrice as unknown as number,
      grossWeight: receivedValues.grossWeight as unknown as number,
      usedWeight: receivedValues.marketWeight as unknown as number,
    });

    const updatedIngredient =
      await this.ingredientsRepository.update(ingredient);

    await this.updatingValuePartial.execute(updatedIngredient.recipeId);

    return updatedIngredient;
  }
}
