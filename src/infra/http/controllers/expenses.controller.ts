import { SaveExpenses } from '@application/use-cases/expenses/saveExpenses';
import { JwtAuthGuard } from '@auth/jwt-auth.guard';
import {
  BadRequestException,
  Body,
  Controller,
  HttpStatus,
  InternalServerErrorException,
  NotFoundException,
  Patch,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { ExpensesDTO } from '../DTOs/expenses-dto';
import { IngredientViewModel } from '../view-models/ingredient-view-model';

@Controller('expenses')
export class ExpensesController {
  constructor(private save: SaveExpenses) {}

  @UseGuards(JwtAuthGuard)
  @Patch()
  async patchExpenses(
    @Res() res: Response,
    @Body() receivedValues: ExpensesDTO,
  ) {
    try {
      const expenses = await this.save.execute(receivedValues);

      return res
        .status(HttpStatus.OK)
        .json(IngredientViewModel.ReturnToHTTP(expenses));
    } catch (error) {
      if (error instanceof BadRequestException) {
        return res
          .status(HttpStatus.BAD_REQUEST)
          .json({ message: 'not save success' });
      }
      if (error instanceof NotFoundException) {
        return res
          .status(HttpStatus.NOT_FOUND)
          .json({ message: 'not found expenses' });
      }
      return new InternalServerErrorException('Internal Error');
    }
  }
}
