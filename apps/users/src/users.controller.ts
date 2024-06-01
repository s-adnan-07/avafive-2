import { Controller, Get, Logger } from '@nestjs/common'
import { UsersService } from './users.service'
import { MessagePattern } from '@nestjs/microservices'

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  private logger = new Logger(UsersController.name, { timestamp: true })

  @MessagePattern('getUser')
  getUser() {
    this.logger.log('User requested')
    return 'user'
  }
}
