import { CreateUserDto, LoginDetailsDto, VerifyEmailDto } from '@app/shared'
import { Body, Controller, Post, Req, Res } from '@nestjs/common'
import { AuthService } from './auth.service'
import { Request, Response } from 'express'

const SIXTY_SECONDS = 60
const THOUSAND_MILLISECONDS = 1000
const TEN_MINUTES = 10 * SIXTY_SECONDS * THOUSAND_MILLISECONDS

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(
    @Body() loginDetailsDto: LoginDetailsDto,
    @Res({ passthrough: true }) res: Response
  ) {
    const { name, token } = await this.authService.login(loginDetailsDto)
    const maxAge = TEN_MINUTES
    res.cookie('jwt', token, { maxAge, httpOnly: true, sameSite: 'strict' })

    return {
      user: name,
    }
  }

  @Post('register')
  register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto)
  }

  @Post('verify')
  verifyEmail(@Body() verifyEmailDto: VerifyEmailDto) {}

  @Post('decode')
  decode(@Req() req: Request) {
    const { jwt } = req.cookies
    return this.authService.decode(jwt)
  }

  @Post('logout')
  logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('jwt')

    return { message: 'Logged out successfully' }
  }
}
