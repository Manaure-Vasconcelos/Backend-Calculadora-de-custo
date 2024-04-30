import { Injectable, NotFoundException } from '@nestjs/common';
import { IngredientService } from '../interfaces/ingredient-service';
import { IngredientDTO } from './DTO/ingredient-dto';
import { prisma } from '../db';

@Injectable()
export class IngredientsService implements IngredientService {
  private readonly ingredients: IngredientDTO[] = [];
  public _valuePartialOfRecipe: number = 0;

  createIngredient(receivedValues: IngredientDTO) {
    const ingredient = this.setRealAmount(receivedValues);
    this.setIngredient(ingredient); // injetar prisma
  }

  setRealAmount(receivedValues: IngredientDTO): IngredientDTO {
    const ingredientPrev = { ...receivedValues };
    ingredientPrev._realAmount =
      (receivedValues.marketPrice * receivedValues.grossWeight) /
      receivedValues.marketWeight;
    return ingredientPrev;
  }

  setIngredient(ingredient: IngredientDTO): void {
    this.ingredients.push({ ...ingredient, id: this.ingredients.length + 1 });
    this.setValuePartialOfRecipe();
  }

  getAllIngredients() {
    if (!this.ingredients.length)
      return new NotFoundException('Primeiro adicione um ingrediente.');
    return this.ingredients;
  }

  getIngredient(id: number) {
    const ingredientFound = this.ingredients.find(
      (ingredient) => ingredient.id === id,
    );
    if (!ingredientFound)
      return new NotFoundException(`Ingredient ${id} not found`);
    return ingredientFound;
  }

  setValuePartialOfRecipe(): void {
    this._valuePartialOfRecipe = this.ingredients.reduce(
      (prev, next) => prev + (next._realAmount ?? 0),
      0,
    );
    // valor da receita tem que salvar em recipe.
  }

  getValuePartialOfRecipe(): number {
    return this._valuePartialOfRecipe; // busca da recipe.
  }

  /* setIngredientInTheContents(...ingredients: IngredientDTO[]): void {
    for (const current of ingredients) {
      // Vai setar no html o elemento.
    }

      for (const currentIngredient of ingredients) {
      row.innerHTML.text = currentIngredient
      Ou em uma lista/tabela de 0 1 2 3 4 5 6 7 8 9 10 | e toda vez que chamada ele seta os valores novamente.
      Atualizando sempre do índice 0.
    } */
}
