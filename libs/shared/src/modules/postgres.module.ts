import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserEntity } from '../entities/user.entity'
import { ProductEntity } from '../entities/product.entity'

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get<string>('URI'),
        entities: [UserEntity, ProductEntity],
        synchronize: configService.get<boolean>('SYNCHRONIZE'), // This value should be false in production
      }),
    }),
  ],
})
export class PostgresModule {}
