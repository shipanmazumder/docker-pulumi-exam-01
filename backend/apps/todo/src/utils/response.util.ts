import { HttpStatus, HttpException } from '@nestjs/common';
import { NextFunction, Response } from 'express';

export class ResponseUtil {
    static validationResponse(errors) {
        return { errors: errors };
    }

    static errorResponse(error: { status: number }) {
        let message = 'Internal Server Error';
        if (error.status === HttpStatus.NOT_FOUND) {
            message = 'Not found';
        }
        return {
            status: false,
            code: error.status,
            message: message,
            data: null,
        };
    }

    static setResponse<T>(
        data: T | null = null,
        message: string = null,
        code: number = 200,
    ) {
        return {
            status: code === HttpStatus.OK || code === HttpStatus.CREATED ? true : false,
            code: code,
            message: message,
            data: data,
        };
    }

    static nextError(next: NextFunction, message: any) {
        next(
            new HttpException(
                message,
                message.status || HttpStatus.INTERNAL_SERVER_ERROR,
            ),
        );
    }

    static customValidationResponse(res: Response, result: { data: any }) {
        return res
            .status(HttpStatus.UNPROCESSABLE_ENTITY)
            .json({ errors: result.data });
    }

    static getResultFormat<T>(
        res: Response,
        next: NextFunction,
        result: { code: number; message: string; data: T | null },
    ) {
        if (!result) {
            return this.nextError(next, 'No Result Found');
        }
        if (result.code == null) {
            return this.nextError(next, 'No Code Found');
        }
        switch (result.code) {
            case HttpStatus.OK:
            case HttpStatus.CREATED:
                return res
                    .status(result.code)
                    .json(this.setResponse<T>(result.data, result.message, result.code));
            case HttpStatus.INTERNAL_SERVER_ERROR:
                return this.nextError(next, result.message);
            case HttpStatus.UNPROCESSABLE_ENTITY:
                return this.customValidationResponse(res, result);
            default:
                return res
                    .status(HttpStatus.OK)
                    .json(this.setResponse<T>(null, result.message, result.code));
        }
    }
}

import { ApiProperty } from '@nestjs/swagger';

export class SuccessResponseDto {
    @ApiProperty({ example: true })
    status: boolean;

    @ApiProperty({ example: 200 })
    code: number;

    @ApiProperty({ example: 'Success message' })
    message: string;
}

export class WriteResponseDto<T> {
    @ApiProperty({ example: true })
    status: boolean;

    @ApiProperty({ example: 201 })
    code: number;

    @ApiProperty({ example: 'Write message' })
    message: string;

    @ApiProperty({ nullable: true, type: () => Object })
    data?: T;
}

export class ErrorResponseDto {
    @ApiProperty({ example: false })
    status: boolean;

    @ApiProperty({ example: 500 })
    code: number;

    @ApiProperty({ example: 'Error message' })
    message: string;
}

export class NotFoundResponseDto {
    @ApiProperty({ example: false })
    status: boolean;

    @ApiProperty({ example: 404 })
    code: number;

    @ApiProperty({ example: 'Error message' })
    message: string;
}