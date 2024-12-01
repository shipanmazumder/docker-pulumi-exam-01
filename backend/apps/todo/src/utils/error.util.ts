import { ApiProperty } from "@nestjs/swagger";

export class ErrorResponseDto {
    @ApiProperty({ example: false })
    status: boolean;

    @ApiProperty({ example: 500 })
    code: number;

    @ApiProperty({ example: 'Error message' })
    message: string;

    @ApiProperty({ nullable: true })
    data: any;
}