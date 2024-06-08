import { Replace } from '@helpers/Replace';

interface IngredientProps {
  id: number;
  name: string;
  usedWeight: number;
  marketPrice: number;
  grossWeight: number;
  realAmount: number;
  recipeId: number;
  createdAt: Date;
}

export class IngredientEntity {
  private readonly props: IngredientProps;

  constructor(
    props: Replace<
      IngredientProps,
      { id?: number; realAmount?: number; createdAt?: Date }
    >,
  ) {
    this.props = {
      id: props.id ?? -1,
      name: props.name,
      usedWeight: props.usedWeight,
      marketPrice: props.marketPrice,
      grossWeight: props.grossWeight,
      realAmount:
        props.realAmount ??
        this.calculateRealAmount(
          props.usedWeight,
          props.marketPrice,
          props.grossWeight,
        ),
      recipeId: props.recipeId,
      createdAt: props.createdAt ?? new Date(),
    };
  }

  set id(id: number) {
    this.props.id = id;
  }

  get id(): number {
    return this.props.id;
  }

  set name(name: string) {
    this.props.name = name;
  }

  get name(): string {
    return this.props.name;
  }

  set usedWeight(usedWeight: number) {
    this.props.usedWeight = usedWeight;
  }

  get usedWeight(): number {
    return this.props.usedWeight;
  }

  set marketPrice(marketPrice: number) {
    this.props.marketPrice = marketPrice;
  }

  get marketPrice(): number {
    return this.props.marketPrice;
  }

  set grossWeight(grossWeight: number) {
    this.props.grossWeight = grossWeight;
  }

  get grossWeight(): number {
    return this.props.grossWeight;
  }

  set realAmount(realAmount: number) {
    this.props.realAmount = realAmount;
  }

  get realAmount(): number {
    return this.props.realAmount;
  }

  set recipeId(recipeId: number) {
    this.props.recipeId = recipeId;
  }

  get recipeId(): number {
    return this.props.recipeId;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  calculateRealAmount(
    usedWeight: number,
    marketPrice: number,
    grossWeight: number,
  ): number {
    return (marketPrice / grossWeight) * usedWeight;
  }
}
/*
const item = new IngredientEntity({
  id: 10,
  name: 'item 1',
  usedWeight: 2,
  marketPrice: 10,
  grossWeight: 5,
  realAmount: 10,
  recipeId: 2,
});

console.log(item);
 */
