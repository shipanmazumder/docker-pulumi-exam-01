import e from "express";
import { Todo } from "../entities/todo.entity";
import { SuccessResponseDto } from "../../utils/response.util";
import { ApiProperty } from "@nestjs/swagger";
import { CreateTodoDto } from "../dto/create-todo.dto";

export class TodoResource {
    static toObject(todo: Todo): Todo {
        return {
            id: todo._id,
            title: todo.title,
            description: todo.description,
            completed: todo.completed,
            createdAt: todo.createdAt
        } as Todo;
    }
    static toList(todos: Todo[]): Todo[] {
        return todos.map(todo => TodoResource.toObject(todo));
    }
}

export class TodoResponse extends SuccessResponseDto {
    @ApiProperty({ nullable: true, type: Todo })
    data?: Todo;
}