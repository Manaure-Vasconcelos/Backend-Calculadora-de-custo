import { Injectable } from '@nestjs/common';
import { IngredientServiceDTO } from '../interfaces/ingredient-service-dto';

@Injectable()
export class IngredientService extends IngredientServiceDTO {
  constructor(
    public describe: string,
    public marketWeight: number,
    public marketPrice: number,
    public grossWeight: number,
    public _realAmount?: number,
  ) {
    super();
  }

  setRealAmount(): void {
    this._realAmount =
      (this.marketPrice * this.grossWeight) / this.marketWeight;
  }
}
