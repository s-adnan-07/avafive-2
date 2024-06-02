import { Module } from '@nestjs/common'
import { SharedService } from '../services/shared.service'
import { PostgresModule } from './postgres.module'
import { ConfigModule } from '@nestjs/config'
import { NatsClientModule } from './nats-client.module'

@Module({
  imports: [
    // PostgresModule,
    // NatsClientModule,
    // No need to import above modules as they under the same scope
    // Only import if you are exporting
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath:
        process.env.NODE_ENV == 'development' ? '.env.development' : '.env',
    }),
  ],
  providers: [SharedService],
  exports: [SharedService],
})
export class SharedModule {}
