import { Injectable } from '@nestjs/common';
import { IngredientProtocol } from 'src/interfaces/ingredient-protocol';

@Injectable()
export class TableIngredientsService {
  private readonly _ingredients: IngredientProtocol[] = [];
  public _valuePartialOfRecipe: number = 0;
  // valor parcial da receita e usar pela intancia no arquivo index.
  constructor(public readonly ingredientService: IngredientProtocol) {}

  setIngredient(ingredient: IngredientProtocol) {
    this._ingredients.push(ingredient);
    ingredient.setRealAmount();
    this.setValuePartialOfRecipe();
    this.setIngredientInTheContents(...this._ingredients);
  }

  getIngredient(): IngredientProtocol[] {
    return this._ingredients;
  }

  setValuePartialOfRecipe(): void {
    this._valuePartialOfRecipe = this._ingredients.reduce(
      (prev, next) => prev + (next._realAmount ?? 0),
      0,
    );
  }

  getValuePartialOfRecipe(): number {
    return this._valuePartialOfRecipe;
  }

  setIngredientInTheContents(...ingredients: IngredientProtocol[]): void {
    for (const current of ingredients) {
      console.log(current.describe);
    }
    // Vai setar no html o elemento.
    /* 
      for (const currentIngredient of ingredients) {
      row.innerHTML.text = currentIngredient
      Ou em uma lista/tabela de 0 1 2 3 4 5 6 7 8 9 10 | e toda vez que chamada ele seta os valores novamente.
      Atualizando sempre do índice 0.
    */
  }
}
