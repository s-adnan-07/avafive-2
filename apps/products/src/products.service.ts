import { CreateProductPayload, ProductEntity } from '@app/shared'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductEntity)
    private productsRespository: Repository<ProductEntity>
  ) {}

  getHello(): string {
    return 'Products: Hello World!'
  }

  async createProduct({ id, createProductDto }: CreateProductPayload) {
    const product = this.productsRespository.create({
      ...createProductDto,
      user: { id },
    })

    return this.productsRespository.save(product)
  }

  async getAllProducts(id: number) {
    const products = await this.productsRespository.findBy({ user: { id } })
  }

  // addProduct() {}
}
