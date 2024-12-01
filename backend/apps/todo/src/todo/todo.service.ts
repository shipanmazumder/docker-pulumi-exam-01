import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Todo, TodoDocument } from './entities/todo.entity';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { stat } from 'fs';
import { TodoResource } from './resources/todo.resource';

@Injectable()
export class TodoService {
  constructor(@InjectModel(Todo.name) private todoModel: Model<TodoDocument>) { }

  async create(createTodoDto: CreateTodoDto): Promise<any> {
    const createdTodo = new this.todoModel(createTodoDto);
    const data = await createdTodo.save();
    return {
      code: 200,
      message: 'Todo list',
      data: TodoResource.toObject(data),
    }
  }

  async findAll(): Promise<any> {
    const results = await this.todoModel.find().exec();

    return {
      code: 200,
      message: 'Todo list',
      data: TodoResource.toList(results),
    }
  }

  async findOne(id: string): Promise<any> {
    const result = await this.todoModel.findById(id).exec();
    if (!result) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }
    return {
      code: 200,
      message: 'Todo details',
      data: TodoResource.toObject(result),
    }
  }

  async update(id: string, updateTodoDto: UpdateTodoDto): Promise<any> {
    const result = await this.todoModel.findByIdAndUpdate(id, updateTodoDto, { new: true }).exec();
    return {
      code: 200,
      message: 'Todo details',
      data: TodoResource.toObject(result),
    }
  }

  async remove(id: string): Promise<any> {
    await this.todoModel.findByIdAndDelete(id).exec();
    return {
      code: 200,
      message: 'Deleted successfully',
      data: null,
    }
  }
}
