import { Injectable } from '@nestjs/common'

@Injectable()
export class ProductsService {
  getHello(): string {
    return 'Products: Hello World!'
  }
}
