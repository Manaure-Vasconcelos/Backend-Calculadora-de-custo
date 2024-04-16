import { Controller, Get, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';

@Controller('/home')
export class HomeController {
  @Get()
  index(@Req() request: Request, @Res() response: Response) {
    response.status(200).json({
      message: 'Home page',
    });
  }
}
