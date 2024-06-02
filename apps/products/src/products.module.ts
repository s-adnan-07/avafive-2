import { Module } from '@nestjs/common'
import { NatsClientModule } from '@app/nats-client'
import { ProductsController } from './products.controller'
import { ProductsService } from './products.service'

@Module({
  imports: [NatsClientModule],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
