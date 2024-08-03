import { SaveExpenses } from '@application/use-cases/expenses/saveExpenses';
import { JwtAuthGuard } from '@auth/jwt-auth.guard';
import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpStatus,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Patch,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { ExpensesDTO } from '../DTOs/expenses-dto';
import { ExpensesViewModel } from '../view-models/expenses-view-model';
import { GetExpenses } from '@application/use-cases/expenses/getExpenses';

@Controller('expenses')
export class ExpensesController {
  constructor(
    private save: SaveExpenses,
    private get: GetExpenses,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Patch()
  async patchExpenses(
    @Res() res: Response,
    @Body() receivedValues: ExpensesDTO,
  ) {
    try {
      const expenses = await this.save.execute(receivedValues);

      return res.status(HttpStatus.OK).json(ExpensesViewModel.toHTTP(expenses));
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

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  async getExpenses(@Res() res: Response, @Param('id') id: number) {
    const expenses = await this.get.execute(id);

    return res.status(HttpStatus.OK).json(ExpensesViewModel.toHTTP(expenses));
  }
}
