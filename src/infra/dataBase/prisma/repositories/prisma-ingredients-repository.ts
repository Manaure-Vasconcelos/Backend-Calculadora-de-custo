import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { IngredientsRepository } from '@application/repositories/ingredients-repository';
import { IngredientResponse } from '@common/interfaces/ingredientResponse';
import { IngredientEntity } from '@application/entities/ingredient.entity';
import { PrismaIngredientMapper } from '../mappers/prisma-ingredient-mapper';

@Injectable()
export class PrismaIngredientsRepository implements IngredientsRepository {
  constructor(private prisma: PrismaService) {}

  async create(ingredient: IngredientEntity): Promise<IngredientEntity> {
    const raw = PrismaIngredientMapper.toPrisma(ingredient);
    const newIngredient = await this.prisma.ingredient.create({
      data: raw,
    });
    return PrismaIngredientMapper.toDomain(newIngredient);
  }

  async singleIngredient(
    receivedId: number,
  ): Promise<IngredientResponse | null> {
    const ingredientFound = await this.prisma.ingredient.findFirst({
      where: { id: receivedId },
    });
    return ingredientFound;
  }

  async delete(receivedId: number): Promise<IngredientResponse> {
    const deletedIngredient = await this.prisma.ingredient.delete({
      where: { id: receivedId },
    });
    return deletedIngredient;
  }

  async update(ingredient: IngredientEntity): Promise<IngredientEntity> {
    const raw = PrismaIngredientMapper.toPrisma(ingredient);

    const updatedIngredient = await this.prisma.ingredient.update({
      where: { id: ingredient.id },
      data: raw,
    });
    return PrismaIngredientMapper.toDomain(updatedIngredient);
  }
}
