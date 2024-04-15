import { IngredientProtocol } from './ingredient-protocol';

export interface TableIngredientsProtocol {
  ingredientService: IngredientProtocol;
  setIngredient(ingredient: IngredientProtocol): void;
  getIngredients(): IngredientProtocol[];
  setValuePartialOfRecipe(): void;
  getValuePartialOfRecipe(): number;
  setIngredientInTheContents(...ingredients: IngredientProtocol[]): void;
}
