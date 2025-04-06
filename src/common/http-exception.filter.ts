import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      exception instanceof HttpException
        ? exception.getResponse()
        : exception.message || 'Internal server error';

    const errorMessage =
      typeof message === 'string'
        ? message
        : message['message'] || JSON.stringify(message);

    response.status(status).json({
      status: 'error',
      code: status,
      message: HttpStatus[status],
      error: errorMessage,
      path: request.url,
      timestamp: new Date().toISOString(),
    });
  }
}
