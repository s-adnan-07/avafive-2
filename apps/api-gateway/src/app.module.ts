import { Module } from '@nestjs/common'
import { NatsClientModule, SharedModule } from '@app/shared'
import { AppController } from './app.controller'
import { AppService } from './app.service'

@Module({
  imports: [NatsClientModule, SharedModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
