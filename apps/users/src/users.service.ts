import { CreateUserDto, UserEntity } from '@app/shared'
import { Inject, Injectable, UseFilters } from '@nestjs/common'
import { ClientProxy, RpcException } from '@nestjs/microservices'
import { InjectRepository } from '@nestjs/typeorm'
import { QueryFailedError, Repository } from 'typeorm'

@Injectable()
export class UsersService {
  constructor(
    @Inject('NATS_SERVICE') private natsClient: ClientProxy,
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>
  ) {}

  // TODO: add exception filter here to catch 'record doesn't exist errors'
  async getUser(email: string) {
    const user = await this.usersRepository.findOneBy({ email })
    if (!user) return null

    return user
  }

  getHello(): string {
    return 'Users: Hello World!'
  }

  async createUser(createUserDto: CreateUserDto) {
    const user = this.usersRepository.create(createUserDto)
    await this.usersRepository.save(user)
  }

  async generateVerificationCode() {
    // Generate code and save it to user (or somewhere)
  }

  async verifyEmail() {
    // Implement verification logic here
    // Compare entered code to code
    // On successful verification set the verification flag to true in user
  }
}
