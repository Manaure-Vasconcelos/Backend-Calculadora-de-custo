import { IngredientServiceDTO } from './ingredient-service-dto';

export abstract class TableIngredientsDTO {
  createIngredient(ingredient: IngredientServiceDTO): any {}
  setIngredient(ingredient: IngredientServiceDTO): void {}
  getIngredients(): IngredientServiceDTO[] {
    return [];
  }
  setValuePartialOfRecipe(): void {}
  getValuePartialOfRecipe(): number {
    return 0;
  }
  setIngredientInTheContents(...ingredients: IngredientServiceDTO[]): void {}
}
