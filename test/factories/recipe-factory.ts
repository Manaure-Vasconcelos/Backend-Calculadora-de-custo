import { InMemoryRecipesRepository } from '@test/repositories/in-memory-recipe-repository';

export function makeRecipe() {
  const repository = new InMemoryRecipesRepository();

  repository.create({
    userId: 'fakeId',
    title: 'title',
  });

  return repository;
}
