import { Controller, Logger, UseFilters } from '@nestjs/common'
import { MessagePattern, Payload } from '@nestjs/microservices'
import { CreateUserDto } from '@app/shared'
import { UsersService } from './users.service'
import { UsersExceptionFilter } from './users-exception.filter'

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  private logger = new Logger(UsersController.name, { timestamp: true })

  @MessagePattern({ cmd: 'getUser' })
  getUser(@Payload() email: string) {
    return this.usersService.getUser(email)
  }

  // Exception Filters can be used only in controllers
  @MessagePattern({ cmd: 'createUser' })
  @UseFilters(UsersExceptionFilter)
  createUser(@Payload() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto)
  }
}
