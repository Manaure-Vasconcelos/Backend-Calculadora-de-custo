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
});
