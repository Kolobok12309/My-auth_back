import { Controller, Get, Param } from '@nestjs/common';

import AppService from './app.service';

@Controller()
export default class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/:id')
  getHello(@Param() params): string {
    return this.appService.getHello(params.id);
  }
}
