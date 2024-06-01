import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

async function bootstrap() {
  const logger = new Logger('NestApplication')
  const app = await NestFactory.create(AppModule)

  const configService = app.get<ConfigService>(ConfigService)
  const NODE_ENV = configService.get<string>('NODE_ENV')

  await app.listen(5000)

  logger.log('')
  logger.log(`API Gateway running in '${NODE_ENV}' mode`)
}
bootstrap()
