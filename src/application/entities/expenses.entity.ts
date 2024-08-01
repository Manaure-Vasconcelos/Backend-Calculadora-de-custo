import { Replace } from '@helpers/Replace';

interface ExpensesProps {
  valuePartial: number;
  serving: number;
  pack: number;
  costUnit: number;
  recipeId: number;
}

interface calculateProps extends Omit<ExpensesProps, 'costUnit'> {}

export class ExpensesEntity {
  private readonly props: ExpensesProps;

  constructor(props: Replace<ExpensesProps, { costUnit?: number }>) {
    this.props = {
      valuePartial: props.valuePartial,
      serving: props.serving,
      pack: props.pack,
      costUnit: this.calculateCostUnit(props),
      recipeId: props.recipeId,
    };
  }

  private calculateCostUnit({
    valuePartial,
    serving,
    pack,
  }: calculateProps): number {
    return valuePartial / serving + pack;
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

  set costUnit(costUnit: number) {
    this.props.costUnit = costUnit;
  }

  get costUnit(): number {
    return this.props.costUnit;
  }

  set recipeId(recipeId: number) {
    this.props.recipeId = recipeId;
  }

  get recipeId(): number {
    return this.props.recipeId;
  }
}
