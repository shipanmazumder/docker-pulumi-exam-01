import { Controller, Get, Post, Body, Param, Put, Delete, Req, Res, Next, HttpStatus, NotFoundException } from '@nestjs/common';
import { TodoService } from './todo.service';
import { Todo } from './entities/todo.entity';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { ApiCreatedResponse, ApiNotFoundResponse, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { NextFunction, Response } from 'express';
import { ErrorResponseDto, NotFoundResponseDto, ResponseUtil, WriteResponseDto } from '../utils/response.util';
import { TodoResponse } from './resources/todo.resource';
import { ApiCustomResponse } from '../decorators/api-custom-response.decorator';
import { SuccessResponseDto } from '../utils/success.util';

@Controller('api/todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) { }

  @Post()
  @ApiOperation({ summary: 'Create a new todo' })

  @ApiCustomResponse(Todo, false, 201)
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'An error occurred',
    type: ErrorResponseDto,
  })
  async create(@Body() createTodoDto: CreateTodoDto,
    @Req() req,
    @Res() res: Response,
    @Next() next: NextFunction): Promise<any> {
    try {
      const result = await this.todoService.create(createTodoDto);
      ResponseUtil.getResultFormat(res, next, result);
    } catch (e) {
      ResponseUtil.nextError(next, e);
    }
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all todos' })
  @ApiCustomResponse(Todo, true)
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'An error occurred',
    type: ErrorResponseDto,
  })
  async findAll(
    @Req() req,
    @Res() res: Response,
    @Next() next: NextFunction
  ): Promise<any> {

    try {
      const result = await this.todoService.findAll();
      ResponseUtil.getResultFormat(res, next, result);
    } catch (e) {
      ResponseUtil.nextError(next, e);
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a todo by ID' })
  @ApiCustomResponse(Todo)
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'An error occurred',
    type: ErrorResponseDto,
  })
  @ApiNotFoundResponse({
    description: 'Resource Not found',
    type: NotFoundResponseDto,
  })
  async findOne(
    @Param('id') id: string,
    @Req() req,
    @Res() res: Response,
    @Next() next: NextFunction
  ): Promise<any> {
    try {
      const result = await this.todoService.findOne(id);
      ResponseUtil.getResultFormat(res, next, result);
    } catch (e) {
      ResponseUtil.nextError(next, e);
    }
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a todo by ID' })
  @ApiCustomResponse(Todo, false, 201)
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'An error occurred',
    type: ErrorResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Resource Not found',
    type: NotFoundResponseDto,
  })
  async update(
    @Param('id') id: string,
    @Body() updateTodoDto: UpdateTodoDto,
    @Req() req,
    @Res() res: Response,
    @Next() next: NextFunction
  ): Promise<any> {

    try {
      const result = await this.todoService.update(id, updateTodoDto);
      ResponseUtil.getResultFormat(res, next, result);
    } catch (e) {
      ResponseUtil.nextError(next, e);
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a todo by ID' })
  @ApiResponse({
    status: 201,
    description: 'Delete Todo',
    type: SuccessResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'An error occurred',
    type: ErrorResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Resource Not found',
    type: NotFoundResponseDto,
  })
  async remove(@Param('id') id: string,
    @Req() req,
    @Res() res: Response,
    @Next() next: NextFunction): Promise<any> {
    try {
      const result = await this.todoService.remove(id);
      ResponseUtil.getResultFormat(res, next, result);
    } catch (e) {
      ResponseUtil.nextError(next, e);
    }
  }
}
