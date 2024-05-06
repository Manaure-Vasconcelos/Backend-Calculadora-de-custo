import { Module } from '@nestjs/common';
import { IngredientsController } from './ingredients.controller';
import { IngredientsService } from './ingredients.service';
import { RealAmountService } from './realAmount.service';
import { PrismaService } from 'src/dataBase/prisma.service';

@Module({
  imports: [],
  controllers: [IngredientsController],
  providers: [IngredientsService, RealAmountService, PrismaService],
})
export class IngredientsModule {}
