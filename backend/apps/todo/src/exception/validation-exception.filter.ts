
import { UnprocessableEntityException } from '@nestjs/common';
import { ResponseUtil } from '../utils/response.util';

export function createValidationException(
    errors: any[],
): UnprocessableEntityException {
    const formattedErrors = errors.reduce((acc, error) => {
        if (error.constraints) {
            const firstConstraintKey = Object.keys(error.constraints)[0];
            acc[error.property] = {
                type: 'field',
                msg: error.constraints[firstConstraintKey] || 'Validation error',
                path: error.property,
                location: 'body',
            };
        } else if (error.children && error.children.length > 0) {
            error.children.forEach((childError) => {
                if (childError.constraints) {
                    const firstChildConstraintKey = Object.keys(
                        childError.constraints,
                    )[0];
                    acc[`${error.property}.${childError.property}`] = {
                        type: 'field',
                        msg:
                            childError.constraints[firstChildConstraintKey] ||
                            'Validation error',
                        path: `${error.property}.${childError.property}`,
                        location: 'body',
                    };
                } else {
                    acc[`${error.property}.${childError.property}`] = {
                        type: 'field',
                        msg: 'Validation error occurred',
                        path: `${error.property}.${childError.property}`,
                        location: 'body',
                    };
                }
            });
        } else {
            acc[error.property] = {
                type: 'field',
                msg: 'Validation error occurred Please Check Nested Property',
                path: error.property,
                location: 'body',
            };
        }
        return acc;
    }, {});

    return new UnprocessableEntityException(
        ResponseUtil.validationResponse(formattedErrors),
    );
}
