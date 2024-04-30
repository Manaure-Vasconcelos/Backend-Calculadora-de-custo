import { IngredientDTO } from '../table-ingredients/DTO/ingredient-dto';

export interface IngredientService {
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
