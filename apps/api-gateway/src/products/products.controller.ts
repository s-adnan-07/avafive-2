import { Body, Controller, Get, Inject, Post, Req, Res } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { Request, Response } from 'express'
import { lastValueFrom } from 'rxjs'
import { AuthService } from '../auth/auth.service'
import { CreateProductDto } from '@app/shared'

@Controller('products')
export class ProductsController {
  constructor(
    @Inject('NATS_SERVICE') private natsClient: ClientProxy,
    private authService: AuthService
  ) {}

  @Get()
  getAllProducts(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
    @Body() user: string
  ) {
    return lastValueFrom(this.natsClient.send({ cmd: 'getProducts' }, user))
  }

  @Post()
  createProduct(
    @Req() req: Request,
    @Body() createProductDto: CreateProductDto
  ) {
    const { jwt } = req.cookies
    const { id } = this.authService.decode(jwt)
    return lastValueFrom(
      this.natsClient.send({ cmd: 'createProduct' }, { id, createProductDto })
    )
  }
}
