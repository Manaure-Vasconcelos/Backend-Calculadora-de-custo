import { Injectable } from '@nestjs/common';
import { IngredientsRepository } from 'src/application/repositories/ingredients-repository';
import { IngredientRequest } from 'src/common/interfaces/ingredientRequest';
import { RealAmountService } from './realAmount.service';
import { IngredientResponse } from 'src/common/interfaces/ingredientResponse';

@Injectable()
export class CreateIngredient {
  constructor(
    private ingredientsRepository: IngredientsRepository,
    private realAmount: RealAmountService,
  ) {}

  async execute(
    receivedValues: IngredientRequest,
  ): Promise<IngredientResponse> {
    const realAmount = this.realAmount.calculate(receivedValues);

    const createdIngredient = await this.ingredientsRepository.create({
      ...receivedValues,
      realAmount: realAmount,
    });

    return createdIngredient;
  }
}
