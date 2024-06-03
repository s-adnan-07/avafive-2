import { CreateUserDto, LoginDetailsDto, VerifyEmailDto } from '@app/shared'
import { Body, Controller, Post, Res } from '@nestjs/common'
import { AuthService } from './auth.service'
import { Response } from 'express'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  login(@Body() loginDetailsDto: LoginDetailsDto) {
    return this.authService.login(loginDetailsDto)
  }

  @Post('register')
  register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto)
  }

  @Post('verify')
  verifyEmail(@Body() verifyEmailDto: VerifyEmailDto) {}

  @Post('logout')
  logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('jwt')

    return { message: 'Logged out successfully' }
  }
}
