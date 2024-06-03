import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator'
import { LoginDetailsDto } from './login-details.dto'

export class CreateUserDto extends LoginDetailsDto {
  @IsNotEmpty()
  @IsString()
  name: string
}
