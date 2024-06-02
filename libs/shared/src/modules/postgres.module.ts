import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserEntity } from '../entities/user.entity'

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get<string>('URI'),
        entities: [UserEntity],
        synchronize: configService.get<boolean>('SYNCHRONIZE'), // This value should be false in production
      }),
    }),
  ],
})
export class PostgresModule {}
