import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerModule,
} from '@nestjs/swagger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.setGlobalPrefix('api/v1')

  //
  // Swagger

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Floorplan API')
    .setVersion('1.0')
    .build()

  const documentFactory = () => SwaggerModule.createDocument(app, swaggerConfig)

  const customOptions: SwaggerCustomOptions = {
    customSiteTitle: 'Floorplan API',
  }

  SwaggerModule.setup('docs', app, documentFactory, customOptions)

  //
  // Listen

  await app.listen(3000)
}

bootstrap()
