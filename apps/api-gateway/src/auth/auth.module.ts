import { Module } from '@nestjs/common'
import { AuthController } from './auth.controller'
import { NatsClientModule } from '@app/shared'
import { AuthService } from './auth.service'
import { JwtModule } from '@nestjs/jwt'

@Module({
  imports: [
    NatsClientModule,
    JwtModule.register({
      secret: 'randomsecret',
      signOptions: { expiresIn: '10m' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
