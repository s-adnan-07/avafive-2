import { Module } from '@nestjs/common'
import { ProductsController } from './products.controller'
import { NatsClientModule } from '@app/shared'
import { AuthModule } from '../auth/auth.module'

@Module({
  imports: [NatsClientModule, AuthModule],
  controllers: [ProductsController],
})
export class ProductsModule {}
