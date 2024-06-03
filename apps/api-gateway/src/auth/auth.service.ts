import { CreateUserDto, LoginDetailsDto, User } from '@app/shared'
import {
  ForbiddenException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { ClientProxy, RpcException } from '@nestjs/microservices'
import { lastValueFrom } from 'rxjs'
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
  constructor(@Inject('NATS_SERVICE') private natsClient: ClientProxy) {}

  async login({ email, password }: LoginDetailsDto) {
    const user = await lastValueFrom(
      this.natsClient.send<User, string>({ cmd: 'getUser' }, email)
    )

    if (!user) throw new UnauthorizedException()
    const passwordsMatch = await this.comparePasswords(password, user.password)

    if (!passwordsMatch) throw new UnauthorizedException()
    const { password: userPass, id, role, ...hydratedUser } = user

    // TODO: Generate jwt with name, email and role as payload here

    return hydratedUser
  }

  comparePasswords(password = '', hash = '') {
    return bcrypt.compare(password, hash)
  }

  // !FIX: Handle no subscribers listening to event error
  async register({ password, ...createUserDto }: CreateUserDto) {
    const hash = await bcrypt.hash(password, 10)

    try {
      await lastValueFrom(
        this.natsClient.send<void, CreateUserDto>(
          { cmd: 'createUser' },
          { ...createUserDto, password: hash }
        ),
        { defaultValue: undefined }
      )
    } catch (e) {
      // typeof(e) = 'string'
      throw new ForbiddenException(e)
    }

    return { message: 'User Created Successfully' }
  }
}
