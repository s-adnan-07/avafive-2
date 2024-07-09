import { Controller, Get, Logger } from '@nestjs/common'
import { ProductsService } from './products.service'
import { MessagePattern, Payload } from '@nestjs/microservices'
import { CreateProductPayload } from '@app/shared'

@Controller()
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  private logger = new Logger(ProductsController.name, { timestamp: true })

  @MessagePattern('getProduct')
  getProduct() {
    this.logger.log('Product requested')
    return 'product'
  }

  @MessagePattern({ cmd: 'getProducts' })
  getAllProducts(@Payload() id: number) {
    this.productsService.getAllProducts(id)
  }

  @MessagePattern({ cmd: 'createProduct' })
  createProduct(@Payload() payload: CreateProductPayload) {
    return this.productsService.createProduct(payload)
  }
}
