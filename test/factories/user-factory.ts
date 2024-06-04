import { InMemoryUserRepository } from '@test/repositories/in-memory-user-repository';

export function makeUser() {
  const repository = new InMemoryUserRepository();

  repository.create({
    id: 'id',
    name: 'manaure',
    email: 'manaure@gmail.com',
    password: 'Password123@',
  });

  return repository;
}
