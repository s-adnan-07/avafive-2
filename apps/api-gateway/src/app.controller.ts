import { lastValueFrom } from 'rxjs'
import { Body, Controller, Get, Inject, Post } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { AppService } from './app.service'
import { CreateUserDto } from '@app/shared'

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject('NATS_SERVICE') private natsClient: ClientProxy
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello()
  }

  @Get('users')
  getUsers() {
    return lastValueFrom(this.natsClient.send('getUser', {}))
  }

  @Get('products')
  getProducts() {
    return lastValueFrom(this.natsClient.send('getProduct', {}))
  }

  @Post('users')
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.natsClient.send('createUser', createUserDto)
  }
}
