import { Injectable } from '@nestjs/common';
import { IngredientsRepository } from 'src/application/repositories/ingredients-repository';
import { IngredientRequest } from 'src/common/interfaces/ingredientRequest';
import { RealAmountService } from './realAmount.service';

@Injectable()
export class UpdateIngredient {
  constructor(
    private ingredientsRepository: IngredientsRepository,
    private realAmount: RealAmountService,
  ) {}

  async execute(receivedId: string, receivedValues: IngredientRequest) {
    const newRealAmount = await this.realAmount.updating(
      receivedValues,
      +receivedId,
    );

    const updatedIngredient = this.ingredientsRepository.update(
      receivedValues,
      +receivedId,
      newRealAmount,
    );

    return updatedIngredient;
  }
}
