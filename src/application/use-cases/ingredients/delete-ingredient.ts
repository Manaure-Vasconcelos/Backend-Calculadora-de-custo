import { Injectable } from '@nestjs/common';
import { IngredientsRepository } from 'src/application/repositories/ingredients-repository';
import { UpdatingValuePartial } from '../recipes/update-value-partial';

@Injectable()
export class DeleteIngredient {
  constructor(
    private ingredientsRepository: IngredientsRepository,
    private updatingValuePartial: UpdatingValuePartial,
  ) {}

  async execute(receivedId: string) {
    const deletedIngredient =
      await this.ingredientsRepository.delete(+receivedId);

    await this.updatingValuePartial.execute(deletedIngredient.recipeId);

    return deletedIngredient;
  }
}
