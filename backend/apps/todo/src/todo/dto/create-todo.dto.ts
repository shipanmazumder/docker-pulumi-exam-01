import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsBoolean } from 'class-validator';

export class CreateTodoDto {
    @ApiProperty()
    @IsString()
    title: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    description?: string;
}
