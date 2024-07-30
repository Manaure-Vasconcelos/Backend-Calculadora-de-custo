import { Replace } from '@helpers/Replace';

interface ProfileProps {
  fixedCosts?: number;
  daysOfWorking?: number;
  salesPerDay?: number;
}

export class ProfileEntity {
  private props: ProfileProps;

  constructor(
    props?: Replace<
      ProfileProps,
      { fixedCosts?: number; daysOfWorking?: number; salesPerDay?: number }
    >,
  ) {
    this.props = {
      fixedCosts: props?.fixedCosts || 0,
      daysOfWorking: props?.daysOfWorking || 0,
      salesPerDay: props?.salesPerDay || 0,
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
}
