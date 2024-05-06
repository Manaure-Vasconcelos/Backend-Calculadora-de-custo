import { Injectable, NotFoundException } from '@nestjs/common';
import { IngredientService } from '../../../interfaces/ingredient-service';
import { IngredientDTO } from '../../../infra/http/DTOs/ingredient-dto';
import { PrismaService } from '../dataBase/prisma.service';
import { RealAmountService } from './realAmount.service';

@Injectable()
export class IngredientsService implements IngredientService {
  private readonly ingredients: IngredientDTO[] = [];
  public _valuePartialOfRecipe: number = 0;

  constructor(
    private prisma: PrismaService,
    private realAmount: RealAmountService,
  ) {}

  async createIngredient(receivedValues: IngredientDTO) {
    const { name, marketWeight, marketPrice, grossWeight } = receivedValues;

    const realAmount = this.realAmount.calculate(
      marketPrice,
      marketWeight,
      grossWeight,
    );

    const newIngredient = await this.prisma.ingredient.create({
      data: {
        name,
        marketWeight,
        marketPrice,
        grossWeight,
        realAmount,
        //recipeId,
      },
    });
    return newIngredient;
    // inserir recipe no ingredient
    // ao criar setar o total da receita.
  }

  async getAllIngredients() {
    try {
      const allIngredients = await this.prisma.ingredient.findMany();
      return allIngredients;
    } catch (error) {
      return new NotFoundException('Primeiro adicione um ingrediente.');
    }
  }

  async getIngredient(receivedId: number) {
    try {
      const ingredientFound = await this.prisma.ingredient.findFirst({
        where: { id: receivedId },
      });
      return ingredientFound;
    } catch (error) {
      return new NotFoundException(`Ingredient ${receivedId} not found`);
    }
  }

  async deleteIngredient(receivedId: number) {
    try {
      const deletedIngredient = await this.prisma.ingredient.delete({
        where: { id: receivedId },
      });
      return deletedIngredient;
    } catch (error) {
      return new NotFoundException(`Ingredient ${receivedId} not found`);
    }
  }

  async updateIngredient(receivedId: number, receivedValues: IngredientDTO) {
    try {
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
    } catch (error) {
      return new NotFoundException(`Não foi possível atualizar o ingrediente.`);
    }
  }

  setValuePartialOfRecipe(): void {
    this._valuePartialOfRecipe = this.ingredients.reduce(
      (prev, next) => prev + (next._realAmount ?? 0),
      0,
    );
    // valor da receita tem que salvar em recipe.
    // lidar com isso em receitas
  }

  getValuePartialOfRecipe(): number {
    return this._valuePartialOfRecipe; // busca da recipe.
    // lidar com isso em receitas
  }

  /* setIngredientInTheContents(...ingredients: IngredientDTO[]): void {
    for (const current of ingredients) {
      // Vai setar no html o elemento.
    }

      for (const currentIngredient of ingredients) {
      row.innerHTML.text = currentIngredient
      Ou em uma lista/tabela de 0 1 2 3 4 5 6 7 8 9 10 | e toda vez que chamada ele seta os valores novamente.
      Atualizando sempre do índice 0.
    } */
}
