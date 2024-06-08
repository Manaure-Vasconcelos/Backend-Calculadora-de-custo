import { Injectable } from '@nestjs/common';
import { RecipesRepository } from 'src/application/repositories/recipes-repository';
import { PrismaService } from '../prisma.service';
import { RecipeEntity } from '@application/entities/recipe.entity';
import { PrismaRecipeMapper } from '../mappers/prisma-recipe-mapper';

@Injectable()
export class PrismaRecipesRepository implements RecipesRepository {
  constructor(private prisma: PrismaService) {}

  async create(recipe: RecipeEntity): Promise<any> {
    const raw = PrismaRecipeMapper.toPrisma(recipe);
    const recipeCreated = await this.prisma.recipes.create({
      data: raw,
    });
    return PrismaRecipeMapper.toDomain(recipeCreated);
  }

  async allRecipesFromUser(receivedId: string): Promise<any> {
    const recipes = await this.prisma.recipes.findMany({
      where: { userId: receivedId },
      include: { ingredients: true },
    });
    return recipes.map(PrismaRecipeMapper.toDomain);
  }

  async getRecipe(receivedId: number): Promise<any> {
    const recipe = await this.prisma.recipes.findFirst({
      where: { id: receivedId },
      include: { ingredients: true },
    });

    if (!recipe) return null;

    return PrismaRecipeMapper.toDomain(recipe);
  }

  async delete(receivedId: number): Promise<any> {
    const recipeDeleted = await this.prisma.recipes.delete({
      where: { id: receivedId },
    });
    return recipeDeleted;
  }

  async update(values: RecipeEntity): Promise<any> {
    const raw = PrismaRecipeMapper.toUpdate(values);
    const updatedRecipe = await this.prisma.recipes.update({
      where: { id: raw.id },
      data: raw,
    });
    return updatedRecipe;
  }
}
