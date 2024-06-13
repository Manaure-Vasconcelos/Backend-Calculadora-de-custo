import { Injectable } from '@nestjs/common';
import { IngredientsRepository } from 'src/application/repositories/ingredients-repository';
import { UpdatingValuePartial } from '../recipes/update-value-partial';
import { IngredientEntity } from '@application/entities/ingredient.entity';

interface IngredientUpdatingRequest {
  name?: string;
  marketPrice: number;
  grossWeight: number;
  usedWeight: number;
}

@Injectable()
export class SaveIngredient {
  constructor(
    private ingredientsRepository: IngredientsRepository,
    private updatingValuePartial: UpdatingValuePartial,
  ) {}

  async execute(receivedId: string, receivedValues: IngredientUpdatingRequest) {
    const ingredient = new IngredientEntity({
      id: +receivedId,
      recipeId: 0,
      name: receivedValues.name ?? 'default',
      marketPrice: receivedValues.marketPrice,
      grossWeight: receivedValues.grossWeight,
      usedWeight: receivedValues.usedWeight,
    });

    const updatedIngredient = await this.ingredientsRepository.save(ingredient);

    /* await this.updatingValuePartial.execute(updatedIngredient.recipeId); */

    return updatedIngredient;
  }
}
