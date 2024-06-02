import { Module } from '@nestjs/common'
import { ClientsModule, Transport } from '@nestjs/microservices'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { NatsClientService } from './nats-client.service'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath:
        process.env.NODE_ENV == 'development' ? '.env.development' : '.env',
    }),
    ClientsModule.registerAsync([
      {
        name: 'NATS_SERVICE',
        inject: [ConfigService],
        useFactory: async (configService: ConfigService) => ({
          transport: Transport.NATS,
          options: { servers: [configService.get<string>('NATS')] },
        }),
      },
    ]),
  ],
  providers: [NatsClientService],
  exports: [
    NatsClientService,
    ClientsModule.registerAsync([
      {
        name: 'NATS_SERVICE',
        inject: [ConfigService],
        useFactory: async (configService: ConfigService) => ({
          transport: Transport.NATS,
          options: { servers: [configService.get<string>('NATS')] },
        }),
      },
    ]),
  ],
})
export class NatsClientModule {}
