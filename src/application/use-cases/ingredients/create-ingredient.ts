import { Injectable } from '@nestjs/common';
import { IngredientsRepository } from 'src/application/repositories/ingredients-repository';
import { IngredientRequest } from 'src/common/interfaces/ingredientRequest';
import { RealAmountService } from './realAmount.service';
import { IngredientResponse } from 'src/common/interfaces/ingredientResponse';
import { UpdatingValuePartial } from './../recipes/update-value-partial';

@Injectable()
export class CreateIngredient {
  constructor(
    private ingredientsRepository: IngredientsRepository,
    private realAmount: RealAmountService,
    private updatingValuePartial: UpdatingValuePartial,
  ) {}

  async execute(
    recipeId: string,
    receivedValues: IngredientRequest,
  ): Promise<IngredientResponse> {
    const realAmount = this.realAmount.calculate(receivedValues);

    const createdIngredient = await this.ingredientsRepository.create(
      +recipeId,
      receivedValues,
      realAmount,
    );

    await this.updatingValuePartial.execute(+recipeId);

    return createdIngredient;
  }
}
