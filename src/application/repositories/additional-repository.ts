import { AdditionalEntity } from '@application/entities/additional.entity';
import { ReturnToDomain } from '@infra/dataBase/prisma/mappers/prisma-ingredient-mapper';
import { ReturnGetRecipe } from '@infra/dataBase/prisma/mappers/prisma-recipe-mapper';

export interface PropsCreateAdditional {
  additional: AdditionalEntity;
  valueUnit: number;
  valueTotal: number;
}

export abstract class AdditionalRepository {
  abstract get(id: number): Promise<AdditionalEntity | null>;
  abstract create({
    additional,
    valueUnit,
    valueTotal,
  }: PropsCreateAdditional): Promise<ReturnGetRecipe>;
  abstract save(additional: AdditionalEntity): Promise<ReturnToDomain>;
}
