import { TableIngredientsProtocol } from './table-ingredient-protocol';

export interface TableCostUnitProtocol {
  tableOfIngredients: TableIngredientsProtocol;
  setServings(value: number): void;
  getServings(): number;
  setPackaging(value: number): void;
  getPackaging(): number;
  setCostUnit(): void;
  getCostUnit(): number;
  costUnit(): number;
}
