import { Injectable } from '@nestjs/common';

@Injectable()
export class BoilerplateService {
  getHello(): string {
    return 'Hello World!';
  }
}
