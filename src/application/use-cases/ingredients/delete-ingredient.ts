import { Injectable } from '@nestjs/common';
import { IngredientsRepository } from '@application/repositories/ingredients-repository';

@Injectable()
export class DeleteIngredient {
  constructor(private ingredientsRepository: IngredientsRepository) {}

  async execute(receivedId: string) {
    await this.ingredientsRepository.delete(+receivedId);
  }
}
