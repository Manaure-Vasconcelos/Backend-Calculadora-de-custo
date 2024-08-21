import { Replace } from '@helpers/Replace';

interface ExpensesProps {
  valuePartial: number;
  serving: number;
  pack: number;
  profit: number;
  valueTotal: number;
  valueUnit: number;
  recipeId: number;
}

interface AdditionalProps {
  id: number;
  name: string;
  usedWeight: number;
  marketPrice: number;
  grossWeight: number;
  realAmount: number;
  recipeId: number;
}

export class ExpensesEntity {
  private readonly props: ExpensesProps;

  constructor(
    props: Replace<ExpensesProps, { valueUnit?: number; valueTotal?: number }>,
  ) {
    this.props = {
      valuePartial: props.valuePartial,
      serving: props.serving,
      pack: props.pack,
      profit: props.profit,
      valueUnit: 0,
      valueTotal: 0,
      recipeId: props.recipeId,
    };
  }

  public calculateValueUnit(additional?: AdditionalProps[]): void {
    if (this.valuePartial === 0) {
      this.valueUnit = 0;
      return;
    }

    const res = this.valuePartial / this.serving + this.pack;
    if (!isFinite(res)) {
      this.valueUnit = 0;
      return;
    }

    this.valueUnit = res;

    if (additional) {
      const sumAdditional = additional.reduce(
        (total, item) => total + item.realAmount,
        0,
      );

      this.valueUnit = this.valueUnit + sumAdditional;
    }
  }

  public calculateValueTotal(): void {
    if (this.props.valueUnit === 0) {
      this.props.valueTotal = 0;
      return;
    }
    this.props.valueTotal =
      this.props.valueUnit + this.props.valueUnit * (this.props.profit / 100);
  }

  set valuePartial(valuePartial: number) {
    this.props.valuePartial = valuePartial;
  }

  get valuePartial(): number {
    return this.props.valuePartial;
  }

  set serving(serving: number) {
    this.props.serving = serving;
  }

  get serving(): number {
    return this.props.serving;
  }

  set pack(pack: number) {
    this.props.pack = pack;
  }

  get pack(): number {
    return this.props.pack;
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
