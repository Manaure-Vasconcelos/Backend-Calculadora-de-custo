import { Replace } from '@helpers/Replace';

interface ProfitProps {
  valueUnit: number;
  profit: number;
  valueTotal: number;
  recipeId: number;
}

interface calculateProps extends Omit<ProfitProps, 'valueTotal'> {}

export class ProfitEntity {
  private readonly props: ProfitProps;

  constructor(props: Replace<ProfitProps, { valueTotal?: number }>) {
    this.props = {
      valueUnit: props.valueUnit,
      profit: props.profit,
      valueTotal: this.calculateValueTotal(props),
      recipeId: props.recipeId,
    };
  }

  private calculateValueTotal({ valueUnit, profit }: calculateProps): number {
    return valueUnit + valueUnit * (profit / 100);
  }

  set valueUnit(valueUnit: number) {
    this.props.valueUnit = valueUnit;
  }

  get valueUnit(): number {
    return this.props.valueUnit;
  }

  set profit(profit: number) {
    this.props.profit = profit;
  }

  get profit(): number {
    return this.props.profit;
  }

  set valueTotal(valueTotal: number) {
    this.props.valueTotal = valueTotal;
  }

  get valueTotal(): number {
    return this.props.valueTotal;
  }

  set recipeId(recipeId: number) {
    this.props.recipeId = recipeId;
  }

  get recipeId(): number {
    return this.props.recipeId;
  }
}
