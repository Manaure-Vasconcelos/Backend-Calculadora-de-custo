import { describe, expect, it } from 'vitest';
import { makeUser } from '@test/factories/user-factory';
import { GetUser } from './get-acount';

describe('Get acount use-case', () => {
  it('should be able return User', () => {
    const repository = makeUser();
    const getAcount = new GetUser(repository);

    const user = getAcount.execute('manaure@gmail.com');

    expect(user).toBeTruthy();
  });

  it('should be able return throw error', () => {
    const repository = makeUser();
    const getAcount = new GetUser(repository);

    expect(getAcount.execute('manau@gmail.com')).rejects.toThrow(
      'Invalid Email',
    );
  });
});
