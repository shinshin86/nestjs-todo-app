import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { TodoService } from './todo.service';

@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  async createTodo(@Body('title') title: string, @Body('description') description: string) {
    const result = await this.todoService.createTodo(title, description);
    return result.match(
      todo => todo,
      error => {
        throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
      },
    );
  }

  @Get()
  async getTodos() {
    const result = await this.todoService.getTodos();
    return result.match(
      todos => todos,
      error => {
        throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
      },
    );
  }

  @Get(':id')
  async getTodo(@Param('id') id: string) {
    const result = await this.todoService.getTodoById(Number(id));
    return result.match(
      todo => todo,
      error => {
        if (error.message === 'Todo not found') {
          throw new HttpException('Todo not found', HttpStatus.NOT_FOUND);
        }
        throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
      },
    );
  }

  @Put(':id')
  async updateTodo(@Param('id') id: string, @Body('completed') completed: boolean) {
    const result = await this.todoService.updateTodo(Number(id), completed);
    return result.match(
      todo => todo,
      error => {
        throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
      },
    );
  }

  @Delete(':id')
  async deleteTodo(@Param('id') id: string) {
    const result = await this.todoService.deleteTodo(Number(id));
    return result.match(
      () => ({ message: 'Todo deleted successfully' }),
      error => {
        throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
      },
    );
  }
}