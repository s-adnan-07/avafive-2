import { CreateUserDto, UserEntity } from '@app/shared'
import { Inject, Injectable } from '@nestjs/common'
import { ClientProxy, MessagePattern } from '@nestjs/microservices'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

@Injectable()
export class UsersService {
  constructor(
    @Inject('NATS_SERVICE') private natsClient: ClientProxy,
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>
  ) {}

  getHello(): string {
    return 'Users: Hello World!'
  }

  // @MessagePattern('getUser')
  getUser() {
    return 'user'
  }

  createUser(createUserDto: CreateUserDto) {
    const user = this.usersRepository.create(createUserDto)
    return this.usersRepository.save(user)
  }
}
