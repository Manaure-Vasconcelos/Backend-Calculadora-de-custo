interface ProfileProps {
  fixedCosts: number;
  daysOfWorking: number;
  salesPerDay: number;
  fixedCostTotal?: number;
  userId: string;
}

export class ProfileEntity {
  private props: ProfileProps;

  constructor(props: ProfileProps) {
    this.props = {
      fixedCosts: props.fixedCosts,
      daysOfWorking: props.daysOfWorking,
      salesPerDay: props.salesPerDay,
      fixedCostTotal: this.calculateTotal(
        props.fixedCosts,
        props.daysOfWorking,
        props.salesPerDay,
      ),
      userId: props.userId,
    };
  }

  calculateTotal(
    fixedCost: number,
    daysOfWorking: number,
    salesPerDay: number,
  ): number {
    const res = fixedCost / (salesPerDay * daysOfWorking * 4);
    if (res === Infinity || Number.isNaN(res)) return 0;
    return res;
  }

  set fixedCost(fixedCost: number) {
    this.props.fixedCosts = fixedCost;
  }

  get fixedCost(): number {
    return this.props.fixedCosts;
  }

  set daysOfWorking(daysOfWorking: number) {
    this.props.daysOfWorking = daysOfWorking;
  }

  get daysOfWorking(): number {
    return this.props.daysOfWorking;
  }
  set salesPerDay(salesPerDay: number) {
    this.props.salesPerDay = salesPerDay;
  }

  get salesPerDay(): number {
    return this.props.salesPerDay;
  }
  set userId(userId: string) {
    this.props.userId = userId;
  }

  get userId(): string {
    return this.props.userId;
  }

  set fixedCostTotal(fixedCostTotal: number) {
    this.props.fixedCostTotal = fixedCostTotal;
  }

  get fixedCostTotal(): number | undefined {
    return this.props.fixedCostTotal;
  }
}
