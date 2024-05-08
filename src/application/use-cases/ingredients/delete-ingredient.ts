import { Injectable } from '@nestjs/common';
import { IngredientsRepository } from 'src/application/repositories/ingredients-repository';

@Injectable()
export class DeleteIngredient {
  constructor(private ingredientsRepository: IngredientsRepository) {}

  async execute(receivedId: string) {
    const deletedIngredient =
      await this.ingredientsRepository.delete(+receivedId);
    return deletedIngredient;
  }
}
