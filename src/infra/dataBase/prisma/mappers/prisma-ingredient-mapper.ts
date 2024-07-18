import { IngredientEntity } from '@application/entities/ingredient.entity';

interface RawProps {
  id: number;
  name: string;
  usedWeight: number;
  grossWeight: number;
  marketPrice: number;
  realAmount: number;
  recipeId: number;
}

export class PrismaIngredientMapper {
  static toPrisma(recipe: IngredientEntity) {
    return {
      name: recipe.name,
      usedWeight: recipe.usedWeight,
      grossWeight: recipe.grossWeight,
      marketPrice: recipe.marketPrice,
      realAmount: recipe.realAmount,
      recipeId: recipe.recipeId,
    };
  }

  static toSave(raw: RawProps) {
    return {
      name: raw.name === 'default' ? undefined : raw.name,
      usedWeight: raw.usedWeight,
      grossWeight: raw.grossWeight,
      marketPrice: raw.marketPrice,
      realAmount: raw.realAmount,
    };
  }

  static toDomain(raw: RawProps): IngredientEntity {
    return new IngredientEntity({
      id: raw.id,
      recipeId: raw.recipeId,
      name: raw.name,
      marketPrice: raw.marketPrice,
      grossWeight: raw.grossWeight,
      usedWeight: raw.usedWeight,
      realAmount: raw.realAmount,
    });
  }
}
