import { Injectable } from '@nestjs/common';
import { TableIngredientsDTO } from '../interfaces/table-ingredient-dto';
import { IngredientDTO } from '../interfaces/ingredient-service-dto';

@Injectable()
export class TableIngredientsService extends TableIngredientsDTO {
  private readonly _ingredients: IngredientDTO[] = [];
  public _valuePartialOfRecipe: number = 0;

  createIngredient(receivedValues: IngredientDTO) {
    const ingredient = { ...receivedValues };
    this.setRealAmount(ingredient);
    this.setIngredient(ingredient);
  }

  setRealAmount(ingredient: IngredientDTO): void {
    ingredient._realAmount =
      (ingredient.marketPrice * ingredient.grossWeight) /
      ingredient.marketWeight;
  }

  setIngredient(ingredient: IngredientDTO) {
    this._ingredients.push(ingredient);
    this.setValuePartialOfRecipe();
    this.setIngredientInTheContents(...this._ingredients);
  }

  getIngredients(): IngredientDTO[] {
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

  setIngredientInTheContents(...ingredients: IngredientDTO[]): void {
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
