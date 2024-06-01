import { Module } from '@nestjs/common'
import { UsersController } from './users.controller'
import { UsersService } from './users.service'
import { NatsClientModule } from '@app/nats-client'
import { ConfigModule } from '@nestjs/config'

@Module({
  imports: [NatsClientModule, ConfigModule.forRoot({ isGlobal: true })],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
