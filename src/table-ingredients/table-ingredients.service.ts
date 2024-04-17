import { Injectable, NotFoundException } from '@nestjs/common';
import { TableIngredientsDTO } from '../interfaces/table-ingredient-dto';
import { IngredientDTO } from '../interfaces/ingredient-service-dto';

@Injectable()
export class TableIngredientsService extends TableIngredientsDTO {
  private readonly ingredients: IngredientDTO[] = [];
  public _valuePartialOfRecipe: number = 0;

  createIngredient(receivedValues: IngredientDTO) {
    const ingredient = { ...receivedValues };
    ingredient._realAmount = this.setRealAmount(ingredient);
    this.setIngredient(ingredient);
  }

  setRealAmount(ingredient: IngredientDTO): number {
    return (
      (ingredient.marketPrice * ingredient.grossWeight) /
      ingredient.marketWeight
    );
  }

  setIngredient(ingredient: IngredientDTO): void {
    this.ingredients.push({ ...ingredient, id: this.ingredients.length + 1 });
    this.setValuePartialOfRecipe();
    this.setIngredientInTheContents(...this.ingredients);
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
    console.log(ingredientFound);
    if (!ingredientFound) return new NotFoundException(`Task ${id} not found`);
    return ingredientFound;
  }

  setValuePartialOfRecipe(): void {
    this._valuePartialOfRecipe = this.ingredients.reduce(
      (prev, next) => prev + (next._realAmount ?? 0),
      0,
    );
  }

  getValuePartialOfRecipe(): number {
    return this._valuePartialOfRecipe;
  }

  setIngredientInTheContents(...ingredients: IngredientDTO[]): void {
    for (const current of ingredients) {
      // Vai setar no html o elemento.
    }
    /* 
      for (const currentIngredient of ingredients) {
      row.innerHTML.text = currentIngredient
      Ou em uma lista/tabela de 0 1 2 3 4 5 6 7 8 9 10 | e toda vez que chamada ele seta os valores novamente.
      Atualizando sempre do índice 0.
    */
  }
}
