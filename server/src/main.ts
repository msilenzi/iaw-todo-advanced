import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerDocumentOptions,
  SwaggerModule,
} from '@nestjs/swagger'
import { ValidationPipe } from '@nestjs/common'
import config from './config'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.setGlobalPrefix('api/v1')
  app.enableCors()

  //
  // Validations

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  )

  //
  // Swagger

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Todo Advanced API')
    .setDescription('Todo Advanced API description')
    .setVersion('1.0')
    .build()

  const options: SwaggerDocumentOptions = {
    operationIdFactory: (_, methodKey) => methodKey,
  }

  const swaggerDocument = SwaggerModule.createDocument(
    app,
    swaggerConfig,
    options,
  )

  const customOptions: SwaggerCustomOptions = {
    customSiteTitle: 'Todo Advanced API',
  }

  SwaggerModule.setup('docs', app, swaggerDocument, customOptions)

  //
  // Listen

  await app.listen(config.PORT ?? 3000)
}

bootstrap()
