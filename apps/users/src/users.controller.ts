import { Controller, Get, Logger } from '@nestjs/common'
import { UsersService } from './users.service'
import { MessagePattern, Payload } from '@nestjs/microservices'
import { CreateUserDto } from '@app/shared'

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  private logger = new Logger(UsersController.name, { timestamp: true })

  @MessagePattern('getUser')
  getUser() {
    this.logger.log('User requested')
    return 'user'
  }

  @MessagePattern('createUser')
  createUser(@Payload() createUserDto: CreateUserDto) {
    this.logger.log('User requested')
    // this.logger.log(createUserDto)
    // return createUserDto
    // return 'user'
    return this.usersService.createUser(createUserDto)
  }
}
