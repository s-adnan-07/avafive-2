import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { Logger, ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

async function bootstrap() {
  const logger = new Logger('NestApplication')
  const app = await NestFactory.create(AppModule)

  app.useGlobalPipes(new ValidationPipe())

  const configService = app.get<ConfigService>(ConfigService)
  const NODE_ENV = configService.get<string>('NODE_ENV')
  const PORT = configService.get<string>('PORT')

  await app.listen(PORT)

  logger.log('')
  logger.log(`API Gateway running in '${NODE_ENV}' mode`)
  logger.log(`Listening on port ${PORT}`)
}
bootstrap()
