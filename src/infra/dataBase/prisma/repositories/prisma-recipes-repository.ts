import { Injectable } from '@nestjs/common';
import { RecipesRepository } from 'src/application/repositories/recipes-repository';
import { PrismaService } from '../prisma.service';
import { RecipeRequest } from 'src/common/interfaces/recipeRequest';
import { recipeUpdatingRequest } from 'src/common/interfaces/recipeUpdadeRequest';

@Injectable()
export class PrismaRecipesRepository implements RecipesRepository {
  constructor(private prisma: PrismaService) {}

  async create(receivedValues: RecipeRequest): Promise<any> {
    const { title, describe, userId } = receivedValues;
    const recipeCreated = await this.prisma.recipes.create({
      data: { title, describe, userId },
    });
    return recipeCreated;
  }
  async allRecipesFromUser(receivedId: number): Promise<any> {
    const recipes = await this.prisma.recipes.findMany({
      where: { userId: receivedId },
      include: { ingredients: true },
    });
    return recipes;
  }

  async getRecipe(receivedId: number): Promise<any> {
    const recipe = await this.prisma.recipes.findFirst({
      where: { id: receivedId },
      include: { ingredients: true },
    });
    return recipe;
  }

  async delete(receivedId: number): Promise<any> {
    const recipeDeleted = await this.prisma.recipes.delete({
      where: { id: receivedId },
    });
    return recipeDeleted;
  }

  async update(
    receivedId: number,
    recipeUpdate: recipeUpdatingRequest,
  ): Promise<any> {
    const { title, describe, valuePartial, userId } = recipeUpdate;
    const updatedRecipe = await this.prisma.recipes.update({
      where: { id: receivedId },
      data: { title, describe, valuePartial, userId },
    });
    return updatedRecipe;
  }
}
