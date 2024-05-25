import { randomUUID } from 'node:crypto';

export class RecipeEntity {
  private readonly id: string = randomUUID();
  private valuePartial?: number;

  constructor(
    private title: string,
    private describe: string,
    private userId: number,
  ) {}

  setValuePartial(value: number) {
    this.valuePartial = value;
  }
}
