import {
  Controller,
  Get,
  HttpCode,
  NotFoundException,
  Req,
  Res,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Controller('/home')
export class HomeController {
  @Get()
  index(@Req() request: Request, @Res() response: Response) {
    response.status(200).json({
      message: 'Home page',
    });
  }

  @Get('/notfound')
  @HttpCode(404)
  notFound() {
    return new NotFoundException('Não encontrado.');
  }

  @Get('error')
  @HttpCode(500)
  error() {
    return new NotFoundException('Rota não encontrada.');
  }
}
