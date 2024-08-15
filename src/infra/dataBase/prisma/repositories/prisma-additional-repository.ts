import { AdditionalEntity } from '@application/entities/additional.entity';
import {
  AdditionalRepository,
  PropsCreateAdditional,
} from '@application/repositories/additional-repository';
import { Injectable } from '@nestjs/common';
import { ReturnToDomain } from '../mappers/prisma-ingredient-mapper';
import { PrismaAdditionalMapper } from '../mappers/prisma-additional-mapper';
import { PrismaService } from '../prisma.service';
import { ReturnGetRecipe } from '../mappers/prisma-recipe-mapper';

@Injectable()
export class PrismaAdditionalRepository implements AdditionalRepository {
  constructor(private prisma: PrismaService) {}

  get(id: number): Promise<AdditionalEntity | null> {
    throw new Error('Method not implemented.');
  }
  async create({
    additional,
    valueUnit,
    valueTotal,
  }: PropsCreateAdditional): Promise<ReturnGetRecipe> {
    const raw = PrismaAdditionalMapper.toPrisma(additional);
    const res = await this.prisma.recipes.update({
      where: { id: additional.recipeId },
      data: {
        additional: {
          create: {
            name: raw.name,
            marketPrice: raw.marketPrice,
            grossWeight: raw.grossWeight,
            usedWeight: raw.usedWeight,
            realAmount: raw.realAmount,
          },
        },
        expenses: {
          update: {
            data: { valueUnit: valueUnit, valueTotal: valueTotal },
          },
        },
      },
      include: { ingredients: true, expenses: true, additional: true },
    });
    console.log(res);
    return PrismaAdditionalMapper.toDomain(res);
  }
  save(additional: AdditionalEntity): Promise<ReturnToDomain> {
    throw new Error('Method not implemented.');
  }
}
