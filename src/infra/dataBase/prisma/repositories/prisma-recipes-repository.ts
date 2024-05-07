import { Injectable } from '@nestjs/common';
import { RecipesRepository } from 'src/application/repositories/recipes-repository';
import { RecipesDTO } from 'src/infra/http/DTOs/recipe-dto';
import { PrismaService } from '../prisma.service';
//aqui eu faço somente as solicitações diretamente.
// nos use-case eu faço as requisições e as verificações.
// se eu quiser todas as receitas do user => posso pedir uma receita especifica e setar em uma constante e depois executar algo nela novamente.
// se necessário em use-cases pode usar mais de 1 chamado do repository.
@Injectable()
export class PrismaRecipesRepository implements RecipesRepository {
  constructor(private prisma: PrismaService) {}

  async create(title: string, describe: string, userId: number): Promise<any> {
    const recipeCreated = await this.prisma.recipes.create({
      data: { title, describe, userId },
    });
    return recipeCreated;
  }
  async allRecipes(): Promise<any> {
    const recipes = await this.prisma.recipes.findMany({
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

  async update(receivedId: number, recipeUpdate: RecipesDTO): Promise<any> {
    const { title, describe, userId } = recipeUpdate;
    const updatedRecipe = await this.prisma.recipes.update({
      where: { id: receivedId },
      data: { title, describe, userId },
    });
    return updatedRecipe;
  }
}
