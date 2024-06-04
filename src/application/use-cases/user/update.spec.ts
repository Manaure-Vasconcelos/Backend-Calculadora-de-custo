import { describe, expect, it } from 'vitest';
import { makeUser } from '@test/factories/user-factory';
import { UpdateUser } from './update';

describe('Updating use-case', () => {
  it('should be able return updating user', async () => {
    const repository = makeUser();
    const updating = new UpdateUser(repository);

    await updating.execute({
      id: 'id',
      name: 'novo nome',
      email: undefined,
      password: undefined,
    });

    const user = repository.ListUsers[0];

    expect(user.name).toBe('novo nome');
  });

  it('should not be able return updating user', async () => {
    const repository = makeUser();
    const updating = new UpdateUser(repository);

    await updating.execute({
      id: 'Diferent',
      name: 'novo nome',
      email: undefined,
      password: undefined,
    });

    const user = repository.ListUsers[0];

    expect(user.name).toBe('manaure');
  });
});
