import { Module } from '@nestjs/common'
import { NatsClientModule, SharedModule } from '@app/shared'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'
import { ProductsModule } from './products/products.module'

@Module({
  imports: [NatsClientModule, SharedModule, AuthModule, ProductsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
