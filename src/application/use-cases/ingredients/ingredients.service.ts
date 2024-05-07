export class IngredientsService implements IngredientService {
  // Get value && update value
  setValuePartialOfRecipe(): void {
    this._valuePartialOfRecipe = this.ingredients.reduce(
      (prev, next) => prev + (next._realAmount ?? 0),
      0,
    );
    // valor da receita tem que salvar em recipe.
    // lidar com isso em receitas
  }

  getValuePartialOfRecipe(): number {
    return this._valuePartialOfRecipe; // busca da recipe.
    // lidar com isso em receitas
  }
}
