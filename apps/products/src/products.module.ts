import { Module } from '@nestjs/common'
import { ProductsController } from './products.controller'
import { ProductsService } from './products.service'
import { NatsClientModule } from '@app/nats-client'
import { ConfigModule } from '@nestjs/config'

@Module({
  imports: [NatsClientModule, ConfigModule.forRoot({ isGlobal: true })],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
