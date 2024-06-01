import { Controller, Get, Logger } from '@nestjs/common'
import { ProductsService } from './products.service'
import { MessagePattern } from '@nestjs/microservices'

@Controller()
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  private logger = new Logger(ProductsController.name, { timestamp: true })

  @MessagePattern('getProduct')
  getProduct() {
    this.logger.log('Product requested')
    return 'product'
  }
}
