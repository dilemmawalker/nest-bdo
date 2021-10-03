import { Module } from '@nestjs/common';
import { BoilerplateController } from './boilerplate.controller';
import { BoilerplateService } from './boilerplate.service';

@Module({
  imports: [],
  controllers: [BoilerplateController],
  providers: [BoilerplateService],
})
export class BoilerplateModule {}
