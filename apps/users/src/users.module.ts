import { Module } from '@nestjs/common'
import { NatsClientModule } from '@app/nats-client'
import { UsersController } from './users.controller'
import { UsersService } from './users.service'

@Module({
  imports: [NatsClientModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
