import { Injectable } from '@nestjs/common';
import { RecipesRepository } from '@application/repositories/recipes-repository';

@Injectable()
export class DeleteRecipe {
  constructor(private recipeRepository: RecipesRepository) {}

  async execute(receivedId: string): Promise<void> {
    await this.recipeRepository.delete(+receivedId);
  }
}
