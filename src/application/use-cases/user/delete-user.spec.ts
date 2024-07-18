import { describe, expect, it } from 'vitest';
import { DeleteUser } from './delete-user';
import { makeUser } from '@test/factories/user-factory';

describe('Delete use-case', () => {
  it('should be able delete User', () => {
    const repository = makeUser();
    const deleteRepo = new DeleteUser(repository);

    deleteRepo.execute('id');

    expect(repository.ListUsers.length).toBe(1);
  });
});
