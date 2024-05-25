import { Injectable } from '@nestjs/common';
import { IngredientsRepository } from 'src/application/repositories/ingredients-repository';
import { RealAmountService } from './realAmount.service';
import { IngredientUpdatingRequest } from 'src/common/interfaces/ingredientUpdateRequest';
import { UpdatingValuePartial } from '../recipes/update-value-partial';

@Injectable()
export class UpdateIngredient {
  constructor(
    private ingredientsRepository: IngredientsRepository,
    private realAmount: RealAmountService,
    private updatingValuePartial: UpdatingValuePartial,
  ) {}

  async execute(receivedId: string, receivedValues: IngredientUpdatingRequest) {
    const newRealAmount = await this.realAmount.updating(
      receivedValues,
      receivedId,
    );

    const updatedIngredient = await this.ingredientsRepository.update(
      +receivedId,
      receivedValues,
      newRealAmount,
    );

    await this.updatingValuePartial.execute(updatedIngredient.recipeId);

    return updatedIngredient;
  }
}
