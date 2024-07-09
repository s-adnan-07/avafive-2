import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  ForbiddenException,
} from '@nestjs/common'

@Catch()
export class RegisterExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    console.log('Inside register filter')
    throw new ForbiddenException(exception)
  }
}
