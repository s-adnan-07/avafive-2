import { Inject, Injectable } from '@nestjs/common'
import { ClientProxy, MessagePattern } from '@nestjs/microservices'

@Injectable()
export class UsersService {
  constructor(@Inject('NATS_SERVICE') private natsClient: ClientProxy) {}

  getHello(): string {
    return 'Users: Hello World!'
  }

  @MessagePattern('getUser')
  getUser() {
    return 'user'
  }
}
