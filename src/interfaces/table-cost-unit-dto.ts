import { TableIngredientsDTO } from './table-ingredient-dto';

export abstract class TableCostUnitDTO {
  tableOfIngredients: TableIngredientsDTO;
  setServings(value: number): void {}
  getServings(): number {
    return 0;
  }
  setPackaging(value: number): void {}
  getPackaging(): number {
    return 0;
  }
  setCostUnit(): void {}
  getCostUnit(): number {
    return 0;
  }
  costUnit(): number {
    return 0;
  }
}
