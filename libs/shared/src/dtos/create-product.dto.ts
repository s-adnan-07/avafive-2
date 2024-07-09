import { IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  model: string

  @IsOptional()
  @IsString()
  title: string

  @IsOptional()
  @IsString()
  category: string
}
