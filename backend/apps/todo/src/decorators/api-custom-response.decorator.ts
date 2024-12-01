import { applyDecorators, Type } from '@nestjs/common';
import { ApiExtraModels, ApiResponse, getSchemaPath } from '@nestjs/swagger';
import { SuccessResponseDto } from '../utils/response.util';

export const ApiCustomResponse = <TModel extends Type<any>>(model: TModel, isArray: boolean = false, code: number = 200) => {
    return applyDecorators(
        ApiExtraModels(SuccessResponseDto, model),
        ApiResponse({
            status: code,
            description: 'Successful response',
            schema: {
                allOf: [
                    { $ref: getSchemaPath(SuccessResponseDto) },
                    {
                        properties: {
                            data: isArray
                                ? {
                                    type: 'array',
                                    items: { $ref: getSchemaPath(model) },
                                }
                                : { $ref: getSchemaPath(model) }, // Single object case
                        },
                    },
                ],
            },
        }),
    );
};
