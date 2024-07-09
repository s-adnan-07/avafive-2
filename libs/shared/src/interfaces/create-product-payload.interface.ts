import { CreateProductDto } from '../dtos/create-product.dto'

export interface CreateProductPayload {
  id: number
  createProductDto: CreateProductDto
}
