import { NestFactory } from '@nestjs/core'
import { Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { MicroserviceOptions, Transport } from '@nestjs/microservices'
import { UsersModule } from './users.module'

async function bootstrap() {
  const logger = new Logger('NestMicroservice')
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    UsersModule,
    { transport: Transport.NATS, options: { servers: ['nats://nats'] } }
  )
  const configService = app.get<ConfigService>(ConfigService)
  const NODE_ENV = configService.get<string>('NODE_ENV')

  await app.listen()

  logger.log('')
  logger.log(`Users microservice running in '${NODE_ENV}' mode`)
}

bootstrap()
