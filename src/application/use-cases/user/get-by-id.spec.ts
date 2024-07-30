import { describe, expect, it } from 'vitest';
import { makeUser } from '@test/factories/user-factory';
import { GetUserWithProps } from './get-by-id';
import { NotFoundException } from '@nestjs/common';

describe('Get Profile use-case', () => {
  it('should be able return complete Profile', async () => {
    const repository = makeUser();
    const getProfile = new GetUserWithProps(repository);

    const profile = await getProfile.execute('id');

    expect(profile).toHaveProperty('user.recipes');
  });

  it('should be able return throw error', () => {
    const repository = makeUser();
    const getProfile = new GetUserWithProps(repository);

    expect(getProfile.execute('Different')).rejects.toThrow(NotFoundException);
  });
});
