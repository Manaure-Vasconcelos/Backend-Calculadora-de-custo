import { Injectable } from '@nestjs/common';
import { IngredientsRepository } from 'src/application/repositories/ingredients-repository';
import { IngredientRequest } from 'src/common/interfaces/ingredientRequest';

@Injectable()
export class RealAmountService {
  constructor(private ingredientRepository: IngredientsRepository) {}

  calculate(receivedValues: IngredientRequest): number {
    const { marketPrice, marketWeight, grossWeight } = receivedValues;
    return (marketPrice * grossWeight) / marketWeight;
  }

  async updating(receivedValues: IngredientRequest, idIngredient: number) {
    let { marketWeight, marketPrice, grossWeight } = receivedValues;
    const existingIngredient =
      await this.ingredientRepository.singleIngredient(idIngredient);

    if (marketWeight === undefined)
      marketWeight = Number(existingIngredient?.marketWeight);

    if (marketPrice === undefined)
      marketPrice = Number(existingIngredient?.marketPrice);

    if (grossWeight === undefined)
      grossWeight = Number(existingIngredient?.grossWeight);

    const newRealAmount = (marketPrice * grossWeight) / marketWeight;

    return Number(newRealAmount);
  }
}
