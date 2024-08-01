import { describe, it, expect } from 'vitest';
import { ProfitEntity } from './profit.entity';

describe('Profit Entity test', () => {
  it('should be able create entity with props', () => {
    const payload = { valueUnit: 1000, profit: 30, recipeId: 0 };
    const expenses = new ProfitEntity(payload);

    expect(expenses).toHaveProperty('props.valueUnit', 1000);
    expect(expenses).toHaveProperty('props.profit', 30);
    expect(expenses).toHaveProperty('props.valueTotal', 1300);
    expect(expenses).toHaveProperty('props.recipeId', 0);
  });
});
