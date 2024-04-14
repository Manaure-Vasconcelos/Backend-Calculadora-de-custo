import { Injectable } from '@nestjs/common';
import { TableIngredientsProtocol } from 'src/interfaces/table-ingredient-protocol';

@Injectable()
export class TableCostUnitService {
  private _servings: number = 0;
  private _packaging: number = 0;
  public _costUnit: number = 0;

  // isso é uma injeção de dependencia => é uma forma mais "fechada".
  // Pq a costUnit depende de outra class, o melhor seria criar uma abstração da classe
  constructor(public readonly tableOfIngredients: TableIngredientsProtocol) {}

  setServings(value: number): void {
    this._servings = value;
    this.setCostUnit();
    // chamar o custo unitario novamente
  }

  getServings(): number {
    return this._servings;
  }

  setPackaging(value: number): void {
    this._packaging = value;
    this.setCostUnit();
  }

  getPackaging(): number {
    return this._packaging;
  }

  setCostUnit(): void {
    this._costUnit = this.costUnit();
  }

  getCostUnit(): number {
    return this._costUnit;
  }

  costUnit(): number {
    if (
      !this._servings ||
      !this._packaging ||
      !this.tableOfIngredients.getValuePartialOfRecipe()
    )
      return 0;
    const valueCostUnit =
      this.tableOfIngredients.getValuePartialOfRecipe() / this._servings +
      this._packaging;
    return valueCostUnit;
  }

  addCostUnit() {}
}
