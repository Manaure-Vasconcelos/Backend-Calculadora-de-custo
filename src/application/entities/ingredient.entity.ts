import { randomUUID } from 'node:crypto';

export class IngredientEntity {
  private readonly id: string = randomUUID();

  constructor(
    private name: string,
    private marketWeight: number,
    private marketPrice: number,
    private grossWeight: number,
    private realAmount: number,
    private recipeId: number,
  ) {}
}
