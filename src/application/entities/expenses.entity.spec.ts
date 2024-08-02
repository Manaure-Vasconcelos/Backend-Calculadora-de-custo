import { describe, it, expect } from 'vitest';
import { ExpensesEntity } from './expenses.entity';

describe('Expenses Entity test', () => {
  it('should be able create entity with props', () => {
    const payload = {
      valuePartial: 3600,
      serving: 5,
      pack: 280,
      profit: 30,
      recipeId: 0,
    };
    const expenses = new ExpensesEntity(payload);

    expect(expenses).toHaveProperty('props.valuePartial', 3600);
    expect(expenses).toHaveProperty('props.serving', 5);
    expect(expenses).toHaveProperty('props.pack', 280);
    expect(expenses).toHaveProperty('props.valueUnit', 1000);
    expect(expenses).toHaveProperty('props.recipeId', 0);
  });

  it('should be able calculate valueTotal', () => {
    const payload = {
      valuePartial: 3600,
      serving: 5,
      pack: 280,
      profit: 30,
      recipeId: 0,
    };
    const expenses = new ExpensesEntity(payload);

    expect(expenses).toHaveProperty('props.valueTotal', 0);

    expenses.calculateValueTotal();

    expect(expenses).toHaveProperty('props.valueTotal', 1300);
  });
});
