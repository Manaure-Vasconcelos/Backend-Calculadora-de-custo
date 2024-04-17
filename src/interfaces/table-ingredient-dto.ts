import { IngredientDTO } from './ingredient-service-dto';

export abstract class TableIngredientsDTO {
  createIngredient(ingredient: IngredientDTO): any {}
  setRealAmount(ingredient: IngredientDTO): void {}
  setIngredient(ingredient: IngredientDTO): void {}
  getAllIngredients(): any {}
  setValuePartialOfRecipe(): void {}
  getValuePartialOfRecipe(): number {
    return 0;
  }
  setIngredientInTheContents(...ingredients: IngredientDTO[]): void {}
}
