import { Injectable } from '@nestjs/common';
import { prisma } from 'src/db';

@Injectable()
export class RealAmountService implements RealAmountService {
  calculate(
    marketPrice: number,
    marketWeight: number,
    grossWeight: number,
  ): number {
    return (marketPrice * grossWeight) / marketWeight;
  }

  async updating(
    idIngredient: number,
    marketWeight: number,
    marketPrice: number,
    grossWeight: number,
  ) {
    const existingIngredient = await prisma.ingredient.findUnique({
      where: { id: +idIngredient },
    });

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
