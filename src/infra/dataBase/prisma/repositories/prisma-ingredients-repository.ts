import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { IngredientsRepository } from 'src/application/repositories/ingredients-repository';
import { IngredientRequest } from 'src/common/interfaces/ingredientRequest';
import { IngredientResponse } from 'src/common/interfaces/ingredientResponse';

@Injectable()
export class PrismaIngredientsRepository implements IngredientsRepository {
  constructor(private prisma: PrismaService) {}

  async create(receivedValues: any): Promise<IngredientResponse> {
    const {
      name,
      marketWeight,
      marketPrice,
      grossWeight,
      realAmount,
      recipeId,
    } = receivedValues;

    const newIngredient = await this.prisma.ingredient.create({
      data: {
        name,
        marketWeight,
        marketPrice,
        grossWeight,
        realAmount,
        recipeId,
      },
    });
    return newIngredient;
  }

  async allIngredients(): Promise<any> {
    const allIngredients = await this.prisma.ingredient.findMany();
    return allIngredients;
  }

  async singleIngredient(receivedId: number): Promise<IngredientResponse> {
    const ingredientFound = await this.prisma.ingredient.findFirst({
      where: { id: receivedId },
    });
    return ingredientFound;
  }

  async delete(receivedId: number): Promise<any> {
    const deletedIngredient = await this.prisma.ingredient.delete({
      where: { id: receivedId },
    });
    return deletedIngredient;
  }

  async update(
    receivedId: number,
    receivedValues: IngredientRequest,
  ): Promise<any> {
    const { name, marketWeight, marketPrice, grossWeight } = receivedValues;

    const realAmount = await this.realAmount.updating(
      receivedId,
      marketWeight,
      marketPrice,
      grossWeight,
    );
    const updatedIngredient = await this.prisma.ingredient.update({
      where: { id: receivedId },
      data: { name, marketWeight, marketPrice, grossWeight, realAmount },
    });
    return updatedIngredient;
  }
}
