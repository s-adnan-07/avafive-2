import { Module } from '@nestjs/common'
import { NatsClientModule, SharedModule } from '@app/shared'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'

@Module({
  imports: [NatsClientModule, SharedModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
