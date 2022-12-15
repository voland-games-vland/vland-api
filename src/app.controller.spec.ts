import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "<h1>vland api</h1><p>running...</p>"', () => {
      expect(appController.getHello()).toBe(
        '<h1>vland api</h1><p>running...</p>',
      );
    });
  });
});
