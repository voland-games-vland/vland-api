import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as admin from 'firebase-admin';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get<ConfigService>(ConfigService);

  const adminConfig: admin.ServiceAccount = {
    projectId: configService.get('firebase.projectId'),
    privateKey: configService.get('firebase.privateKey').replace(/\\n/g, '\n').replace(/\\\\n/g, '\n'),
    clientEmail: configService.get('firebase.clientEmail'),
  };

  admin.initializeApp({
    credential: admin.credential.cert(adminConfig),
  });

  const configSwagger = new DocumentBuilder()
    .setTitle('vland Api')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter Firebase JWT token',
        in: 'header',
      },
      'Firebase Authentication',
    )
    .build();
  const document = SwaggerModule.createDocument(app, configSwagger);
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());

  const port = configService.get('port');
  await app.listen(port);
}
bootstrap();
