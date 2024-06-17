import { Injectable, NotFoundException } from '@nestjs/common';
import { IngredientsRepository } from 'src/application/repositories/ingredients-repository';

@Injectable()
export class GetSingleIngredient {
  constructor(private ingredientsRepository: IngredientsRepository) {}

  async execute(receivedId: string) {
    const singleIngredient =
      await this.ingredientsRepository.singleIngredient(+receivedId);

    if (!singleIngredient) throw new NotFoundException('Ingredient NotFound');

    return singleIngredient;
  }
}
