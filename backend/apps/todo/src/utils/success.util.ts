import { ApiProperty } from '@nestjs/swagger';

export class SuccessResponseDto<T> {
    @ApiProperty({ example: true })
    status: boolean;

    @ApiProperty({ example: 200 })
    code: number;

    @ApiProperty({ example: 'Success message' })
    message: string;

    @ApiProperty({ nullable: true, type: () => Object }) // Use a generic type here
    data?: T | null;
}