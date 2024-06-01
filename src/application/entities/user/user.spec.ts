import { describe, expect, it } from 'vitest';
import { UserEntity } from './user.entity';
import { Password } from './password';

describe('User Entity', () => {
  it('should be able create User', () => {
    const user = new UserEntity({
      name: 'Manaure',
      email: 'manaure@gmail.com',
      password: new Password('Password24@'),
    });

    expect(user).toBeTruthy();
  });

  it('should be able create a new instancy of User', () => {
    const user = new UserEntity({
      name: 'Manaure',
      email: 'manaure@gmail.com',
      password: new Password('Password24@'),
    });

    const user2 = new UserEntity({
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password.hashedValue,
      createAt: user.createAt,
    });

    expect(user2).toEqual(
      expect.objectContaining({
        id: user.id,
        name: user.name,
        email: user.email,
        password: user.password.hashedValue,
        createAt: user.createAt,
      }),
    );
  });
});
