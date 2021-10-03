import { Test, TestingModule } from '@nestjs/testing';
import { BoilerplateController } from './boilerplate.controller';
import { BoilerplateService } from './boilerplate.service';

describe('BoilerplateController', () => {
  let boilerplateController: BoilerplateController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [BoilerplateController],
      providers: [BoilerplateService],
    }).compile();

    boilerplateController = app.get<BoilerplateController>(BoilerplateController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(boilerplateController.getHello()).toBe('Hello World!');
    });
  });
});
