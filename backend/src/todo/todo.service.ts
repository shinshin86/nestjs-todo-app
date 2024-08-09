import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Result, ok, err } from 'neverthrow';

@Injectable()
export class TodoService {
  constructor(private prisma: PrismaService) {}

  async createTodo(title: string): Promise<Result<any, Error>> {
    try {
      const todo = await this.prisma.todo.create({
        data: { title },
      });
      return ok(todo);
    } catch (error) {
      return err(new Error('Failed to create todo'));
    }
  }

  async getTodos(): Promise<Result<any, Error>> {
    try {
      const todos = await this.prisma.todo.findMany();
      return ok(todos);
    } catch (error) {
      return err(new Error('Failed to fetch todos'));
    }
  }

  async getTodoById(id: number): Promise<Result<any, Error>> {
    try {
      const todo = await this.prisma.todo.findUnique({
        where: { id },
      });

      if (!todo) {
        return err(new Error('Todo not found'));
      }

      return ok(todo);
    } catch (error) {
      return err(new Error(`Failed to fetch todo: ${error.message}`));
    }
  }

  async updateTodo(id: number, completed: boolean): Promise<Result<any, Error>> {
    try {
      const todo = await this.prisma.todo.update({
        where: { id },
        data: { completed },
      });
      return ok(todo);
    } catch (error) {
      return err(new Error('Failed to update todo'));
    }
  }

  async deleteTodo(id: number): Promise<Result<any, Error>> {
    try {
      await this.prisma.todo.delete({
        where: { id },
      });
      return ok(null);
    } catch (error) {
      return err(new Error('Failed to delete todo'));
    }
  }
}
