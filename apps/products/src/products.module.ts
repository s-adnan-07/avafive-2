import { Module } from '@nestjs/common'
import { NatsClientModule } from '@app/nats-client'
import { ProductsController } from './products.controller'
import { ProductsService } from './products.service'
import { PostgresModule, ProductEntity, SharedModule } from '@app/shared'
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
  imports: [
    NatsClientModule,
    PostgresModule,
    SharedModule,
    TypeOrmModule.forFeature([ProductEntity]),
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
