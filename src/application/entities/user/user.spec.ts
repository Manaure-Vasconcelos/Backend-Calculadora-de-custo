import { describe, expect, it } from 'vitest';
import { UserEntity } from './user.entity';
import { Name } from './name';
import { Email } from './email';
import { Password } from './password';

describe('User Entity', () => {
  it('should be able create User', () => {
    const user = new UserEntity({
      name: new Name('Manaure'),
      email: new Email('manaure@gmail.com'),
      password: new Password('Password24@'),
    });

    expect(user).toBeTruthy();
  });
});
