interface ProfileProps {
  fixedCosts?: number;
  daysOfWorking?: number;
  salesPerDay?: number;
  userId: string;
}

export class ProfileEntity {
  private props: ProfileProps;

  constructor(props: ProfileProps) {
    this.props = {
      fixedCosts: props.fixedCosts,
      daysOfWorking: props.daysOfWorking,
      salesPerDay: props.salesPerDay,
      userId: props.userId,
    };
  }

  set fixedCost(fixedCost: number) {
    this.props.fixedCosts = fixedCost;
  }

  get fixedCost(): number | undefined {
    return this.props.fixedCosts;
  }

  set daysOfWorking(daysOfWorking: number) {
    this.props.daysOfWorking = daysOfWorking;
  }

  get daysOfWorking(): number | undefined {
    return this.props.daysOfWorking;
  }
  set salesPerDay(salesPerDay: number) {
    this.props.salesPerDay = salesPerDay;
  }

  get salesPerDay(): number | undefined {
    return this.props.salesPerDay;
  }
  set userId(userId: string) {
    this.props.userId = userId;
  }

  get userId(): string | undefined {
    return this.props.userId;
  }
}
