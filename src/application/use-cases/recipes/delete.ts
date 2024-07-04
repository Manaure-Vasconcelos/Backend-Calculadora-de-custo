import { Injectable } from '@nestjs/common';
import { RecipesRepository } from '@application/repositories/recipes-repository';

@Injectable()
export class DeleteRecipe {
  constructor(private recipeRepository: RecipesRepository) {}

  async execute(receivedId: number): Promise<void> {
    await this.recipeRepository.delete(receivedId);
  }
}
