import { Module } from '@nestjs/common'
import { NatsClientService } from './nats-client.service'
import { ClientsModule, Transport } from '@nestjs/microservices'

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'NATS_SERVICE',
        transport: Transport.NATS,
        options: { servers: ['nats://nats'] },
      },
    ]),
  ],
  providers: [NatsClientService],
  exports: [
    NatsClientService,
    ClientsModule.register([
      {
        name: 'NATS_SERVICE',
        transport: Transport.NATS,
        options: { servers: ['nats://nats'] },
      },
    ]),
  ],
})
export class NatsClientModule {}
