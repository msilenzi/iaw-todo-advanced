import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerDocumentOptions,
  SwaggerModule,
} from '@nestjs/swagger'
import * as cookieParser from 'cookie-parser'
import { AppModule } from './app.module'
import config from './config'
import { AUTH_COOKIE_KEY } from './auth/auth.service'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.setGlobalPrefix('api/v1')
  app.enableCors()
  app.use(cookieParser())

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
    .addCookieAuth(AUTH_COOKIE_KEY)
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
