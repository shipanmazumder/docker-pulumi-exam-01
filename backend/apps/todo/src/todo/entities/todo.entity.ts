import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';



export type TodoDocument = Todo & Document;

@Schema({ timestamps: true })
export class Todo extends Document {
    @ApiProperty()
    @Prop({ required: true, unique: false })
    title: string;

    @ApiProperty()
    @Prop()
    description?: string;

    @ApiProperty()
    @Prop({ default: false })
    completed: boolean;

    createdAt: Date
}

export const TodoSchema = SchemaFactory.createForClass(Todo);
