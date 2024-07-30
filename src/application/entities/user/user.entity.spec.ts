import { describe, expect, it } from 'vitest';
import { UserEntity } from './user.entity';
import { Password } from './password';
import { ProfileEntity } from './profile.entity';

describe('User Entity', () => {
  it('should be able create User', () => {
    const user = new UserEntity({
      name: 'Manaure',
      email: 'manaure@gmail.com',
      password: new Password('Password24@'),
      profile: new ProfileEntity(),
    });

    expect(user).toBeTruthy();
    expect(user.profile).toHaveProperty('props.fixedCosts', 0);
    expect(user.profile).toHaveProperty('props.daysOfWorking', 0);
    expect(user.profile).toHaveProperty('props.salesPerDay', 0);
  });

  it('should be able create profile existing', () => {
    const user = new UserEntity({
      name: 'Manaure',
      email: 'manaure@gmail.com',
      password: new Password('Password24@'),
      profile: new ProfileEntity({
        fixedCosts: 100,
        daysOfWorking: 5,
        salesPerDay: 50,
      }),
    });

    expect(user.profile).toHaveProperty('props.fixedCosts', 100);
    expect(user.profile).toHaveProperty('props.daysOfWorking', 5);
    expect(user.profile).toHaveProperty('props.salesPerDay', 50);
  });

  it('should be able create a new instancy of User', () => {
    const user = new UserEntity({
      name: 'Manaure',
      email: 'manaure@gmail.com',
      password: new Password('Password24@'),
      profile: new ProfileEntity(),
    });

    const user2 = new UserEntity({
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      createAt: user.createAt,
      profile: new ProfileEntity(),
    });

    expect(user2.password).toBe(user.password);
  });
});
