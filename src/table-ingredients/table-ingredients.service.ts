import { Injectable } from '@nestjs/common';
import { TableIngredientsDTO } from '../interfaces/table-ingredient-dto';
import { IngredientServiceDTO } from '../interfaces/ingredient-service-dto';
import { IngredientService } from '../ingredient/ingredient.service';

@Injectable()
export class TableIngredientsService extends TableIngredientsDTO {
  private readonly _ingredients: IngredientServiceDTO[] = [];
  public _valuePartialOfRecipe: number = 0;

  createIngredient(ingredient: IngredientServiceDTO) {
    const result = new IngredientService(
      ingredient.describe,
      ingredient.marketWeight,
      ingredient.marketPrice,
      ingredient.grossWeight,
    );
    this.setIngredient(result);
    return ingredient;
  }

  setIngredient(ingredient: IngredientServiceDTO) {
    ingredient.setRealAmount();
    this._ingredients.push(ingredient);
    this.setValuePartialOfRecipe();
    this.setIngredientInTheContents(...this._ingredients);
  }

  getIngredients(): IngredientServiceDTO[] {
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

  setIngredientInTheContents(...ingredients: IngredientServiceDTO[]): void {
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
