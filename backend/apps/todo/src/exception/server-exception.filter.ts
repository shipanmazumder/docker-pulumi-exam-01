import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    UnprocessableEntityException,
    HttpStatus,
    Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ResponseUtil } from '../utils/response.util';

@Catch(HttpException)
export class ServerExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        try {
            const ctx = host.switchToHttp();
            const response = ctx.getResponse<Response>();
            const request = ctx.getRequest<Request>();
            const status = exception.getStatus();
            const exceptionResponse: any = exception.getResponse();
            // Logger.error(exception);
            console.log(exceptionResponse);
            // Logger.d(exceptionResponse);

            if (response.headersSent) {
                console.error('Headers already sent. Skipping response.');
                return;
            }
            if (request.url.includes('.env')) {
                return response
                    .status(status)
                    .json(ResponseUtil.errorResponse({ status: status }));
            }
            if (exception instanceof UnprocessableEntityException) {
                return response.status(status).json(exceptionResponse);
            }
            if (exception instanceof HttpException) {
                if (status === HttpStatus.TOO_MANY_REQUESTS) {
                    return response.status(HttpStatus.TOO_MANY_REQUESTS).json({
                        code: HttpStatus.TOO_MANY_REQUESTS,
                        status: 'false',
                        message: exceptionResponse.message,
                        data: null,
                    });
                }
                if (status === HttpStatus.FORBIDDEN) {
                    return response.status(HttpStatus.FORBIDDEN).json({
                        code: HttpStatus.FORBIDDEN,
                        status: 'false',
                        message: exceptionResponse.message,
                        data: null,
                    });
                }
                if (status === HttpStatus.NOT_FOUND) {
                    return response.status(HttpStatus.NOT_FOUND).json({
                        code: HttpStatus.NOT_FOUND,
                        status: 'false',
                        message: exceptionResponse.message,
                        data: null,
                    });
                }
                if (status === HttpStatus.BAD_REQUEST) {
                    return response.status(HttpStatus.BAD_REQUEST).json({
                        code: HttpStatus.BAD_REQUEST,
                        status: 'false',
                        message: exceptionResponse.message,
                        data: null,
                    });
                }
                if (status === HttpStatus.UNPROCESSABLE_ENTITY) {
                    return response
                        .status(status)
                        .json(ResponseUtil.validationResponse(exceptionResponse.response));
                }
            }
            return response
                .status(status)
                .json(ResponseUtil.errorResponse({ status: status }));
        } catch (error) {
            console.error('Error in ServerExceptionFilter:', error);
            const ctx = host.switchToHttp();
            const response = ctx.getResponse<Response>();
            return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json(
                ResponseUtil.errorResponse({
                    status: HttpStatus.INTERNAL_SERVER_ERROR,
                }),
            );
        }
    }
}
