import { Injectable, NotFoundException } from '@nestjs/common';
import { prisma } from '../../../db';
import { RecipesDTO } from 'src/DTO/recipe-dto';

@Injectable()
export class RecipesService {
  // criar o valor parcial da receita aqui.
  // tudo que for receita ser lidado aqui.
  async createRecipe(receivedRecipe: RecipesDTO) {
    try {
      const { title, describe, userId } = receivedRecipe;
      const recipeCreated = await prisma.recipes.create({
        data: { title, describe, userId },
      });
      return recipeCreated;
    } catch (err) {
      throw new NotFoundException(
        'Não foi possível adicionar a receita, verifique os dados inseridos.',
      );
    }
  }

  async getAllRecipes() {
    try {
      const recipes = await prisma.recipes.findMany({
        include: { ingredients: true },
      });
      return recipes;
    } catch (error) {
      return new NotFoundException('Não existe nenhuma receita cadastrada.');
    }
  }

  async getRecipe(receivedId: number) {
    // pesquisar por nome
    const recipe = await prisma.recipes.findFirst({
      where: { id: receivedId },
      include: { ingredients: true },
    });
    if (!recipe)
      return new NotFoundException(
        `Não existe nenhuma receita correspondente.`,
      );
    return recipe;
  }

  async deleteRecipe(receivedId: number) {
    try {
      const recipeDeleted = await prisma.recipes.delete({
        where: { id: receivedId },
      });
      return recipeDeleted;
    } catch (err) {
      throw new NotFoundException('Não foi possível deletar a receita.');
    }
  }

  async updateRecipe(receivedId: number, recipeUpdate: RecipesDTO) {
    try {
      const { title, describe, userId } = recipeUpdate;
      const updatedRecipe = await prisma.recipes.update({
        where: { id: receivedId },
        data: { title, describe, userId },
      });
      return updatedRecipe;
    } catch (err) {
      throw new NotFoundException('Não foi possível atualizar a receita.');
    }
  }
}

// inserir valor da receita => soma o realmAmount de cada ingredient da receita.
