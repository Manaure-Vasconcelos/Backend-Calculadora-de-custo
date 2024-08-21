import { AdditionalEntity } from '@application/entities/additional.entity';
import { ExpensesEntity } from '@application/entities/expenses.entity';
import { RecipeEntity } from '@application/entities/recipe.entity';
import { ReturnToDomain } from '@infra/dataBase/prisma/mappers/prisma-ingredient-mapper';
import { ReturnGetRecipe } from '@infra/dataBase/prisma/mappers/prisma-recipe-mapper';

export interface PropsAdditional {
  additional: AdditionalEntity;
  valueUnit: number;
  valueTotal: number;
}

export abstract class AdditionalRepository {
  abstract create({
    additional,
    valueUnit,
    valueTotal,
  }: PropsAdditional): Promise<ReturnGetRecipe>;
  abstract save({
    additional,
    valueUnit,
    valueTotal,
  }: PropsAdditional): Promise<ReturnToDomain>;
  abstract delete(
    additionalId: number,
    recipe: RecipeEntity,
    expenses: ExpensesEntity,
  ): Promise<void>;
}
