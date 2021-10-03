import { Controller, Get } from '@nestjs/common';
import { BoilerplateService } from './boilerplate.service';

@Controller()
export class BoilerplateController {
  constructor(private readonly boilerplateService: BoilerplateService) {}

  @Get()
  getHello(): string {
    return this.boilerplateService.getHello();
  }
}
