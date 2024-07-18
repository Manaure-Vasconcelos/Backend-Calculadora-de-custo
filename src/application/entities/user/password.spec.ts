import { describe, it, expect } from 'vitest';

import { Password } from './password';

describe('Password class props', () => {
  it('should be able to create a password instancy', () => {
    const result = new Password('Password123@');

    expect(result).toBeTruthy();
  });

  it('should not be able to create a password with less 5 characters', () => {
    expect(() => {
      new Password('Passw1@');
    }).toThrow();
  });

  it('should not be able to create a password with less 20 characters', () => {
    expect(() => {
      new Password('Passw1@'.repeat(4));
    }).toThrow();
  });

  it('should not be able to create a password with error values require', () => {
    expect(() => {
      new Password('Password1');
    }).toThrow();
  });

  it('It should be expected that the password matches the hashPassword value.', () => {
    const pass = new Password('Password123@');

    const isEqual = pass.comparePassword('Password123@', pass.hashedValue);

    expect(isEqual).toBe(true);
  });
});
