import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
import { config } from './app.config'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      // true en development, false en production:
      enableDebugMessages: config.NODE_ENV === 'development',
      // false en development, true en production:
      disableErrorMessages: config.NODE_ENV === 'production',
    })
  )

  await app.listen(config.PORT)
}

bootstrap()
