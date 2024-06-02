import { Module } from '@nestjs/common'
import { NatsClientModule } from '@app/nats-client'
import { AppController } from './app.controller'
import { AppService } from './app.service'

@Module({
  imports: [NatsClientModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
