import { ProfileEntity } from './profile.entity';
import { describe, expect, it } from 'vitest';

describe('profile Entity', () => {
  it('should be able create Profile and calculate total', () => {
    const recipe = new ProfileEntity({
      fixedCosts: 100,
      daysOfWorking: 5,
      salesPerDay: 20,
      userId: '',
    });

    expect(recipe).toBeTruthy();
    expect(recipe).toHaveProperty('props.fixedCostTotal', 0.25);
  });
});
