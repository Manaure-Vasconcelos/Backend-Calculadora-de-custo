import { Injectable } from '@nestjs/common';
import { RecipesRepository } from 'src/application/repositories/recipes-repository';

@Injectable()
export class UpdatingValuePartial {
  // sempre ao criar e atualizar ser chamado.
  constructor(private recipesRepository: RecipesRepository) {}

  async execute(receivedId: number): Promise<void> {
    const recipe = await this.recipesRepository.getRecipe(receivedId);
    console.log(recipe);
  }
}
