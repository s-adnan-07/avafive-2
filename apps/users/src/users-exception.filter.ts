import {
  ArgumentsHost,
  Catch,
  Logger,
  RpcExceptionFilter,
} from '@nestjs/common'
import { throwError } from 'rxjs'
import { QueryFailedError } from 'typeorm'
import { DatabaseError } from 'pg'

// Query Failed Error is from typeorm
// The driver error is the actual error thrown from the driver
// Hence we need to pass Database Error as generic
@Catch(QueryFailedError)
export class UsersExceptionFilter implements RpcExceptionFilter {
  // TODO: See how to inject logger, I want users controller logger
  private logger = new Logger('CreateUser', { timestamp: true })

  catch(exception: QueryFailedError<DatabaseError>, host: ArgumentsHost) {
    const { detail } = exception.driverError
    const newDetail = detail
      .replace(/^key /gi, 'User with ')
      .replace(/[()]/gi, "'")
      .replace('=', ' - ')

    this.logger.error(newDetail)
    // ! Don't throw RpcException here it because we can't handle it in API later
    // return throwError(() => new RpcException(newDetail))

    // The return type of this error is string
    return throwError(() => newDetail)
  }
}
