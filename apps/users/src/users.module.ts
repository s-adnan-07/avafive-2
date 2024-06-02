import { Module } from '@nestjs/common'
import {
  NatsClientModule,
  PostgresModule,
  SharedModule,
  UserEntity,
} from '@app/shared'
import { UsersController } from './users.controller'
import { UsersService } from './users.service'
import { TypeOrmModule } from '@nestjs/typeorm'

// Need to import shared module as it contains config module initialization
// TODO: Add register methods to shared module and remove postgres module
@Module({
  imports: [
    NatsClientModule,
    PostgresModule,
    SharedModule,
    TypeOrmModule.forFeature([UserEntity]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
