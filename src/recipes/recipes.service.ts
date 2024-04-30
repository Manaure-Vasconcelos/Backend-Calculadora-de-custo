import { Injectable, NotFoundException } from '@nestjs/common';
import { prisma } from '../db';

@Injectable()
export class RecipesService {
  async createRecipe(dataRecipe: any) {
    // trata o password_hash e depois setar.
    try {
      const recipeCreated = await prisma.recipes.create({ data: dataRecipe });
      return recipeCreated;
    } catch (err) {
      throw new NotFoundException(
        'Não foi possível adicionar a receita, verifique os dados inseridos.',
      );
    }
  }

  async getAllRecipes() {
    const recipes = await prisma.recipes.findMany();
    if (!recipes.length)
      return new NotFoundException('Não existe nenhuma receita cadastrada.');
    return recipes;
  }

  async getRecipe(idRecipe: number) {
    // pesquisar por nome
    const recipe = await prisma.recipes.findFirst({ where: { id: idRecipe } });
    if (!recipe)
      return new NotFoundException(
        `Não existe nenhuma receita correspondente.`,
      );
    return recipe;
  }

  async deleteRecipe(idRecipe: any) {
    try {
      const recipeDeleted = await prisma.recipes.delete({
        where: { id: idRecipe },
      });
      return recipeDeleted;
    } catch (err) {
      throw new NotFoundException('Não foi possível deletar a receita.');
    }
  }

  async updateRecipe(idRecipe: number, RecipeUpdate: any) {
    try {
      const updatedRecipe = await prisma.recipes.update({
        where: { id: idRecipe },
        data: RecipeUpdate,
      });
      return updatedRecipe;
    } catch (err) {
      throw new NotFoundException('Não foi possível atualizar a receita.');
    }
  }
}
