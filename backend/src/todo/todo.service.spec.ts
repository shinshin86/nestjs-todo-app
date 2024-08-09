import { Test, TestingModule } from '@nestjs/testing';
import { TodoService } from './todo.service';
import { PrismaService } from '../prisma/prisma.service';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';
import { PrismaClient } from '@prisma/client';

describe('TodoService', () => {
  let service: TodoService;
  let prismaService: DeepMockProxy<PrismaClient>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TodoService,
        {
          provide: PrismaService,
          useFactory: () => mockDeep<PrismaClient>(),
        },
      ],
    }).compile();

    service = module.get<TodoService>(TodoService);
    prismaService = module.get(PrismaService) as DeepMockProxy<PrismaClient>;
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getTodoById', () => {
    it('should return a todo if it exists', async () => {
      const mockTodo = {
        id: 1,
        title: 'Test Todo',
        completed: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      prismaService.todo.findUnique.mockResolvedValue(mockTodo);

      const result = await service.getTodoById(1);
      expect(result.isOk()).toBe(true);
      expect(result._unsafeUnwrap()).toEqual(mockTodo);
    });

    it('should return an error if todo does not exist', async () => {
      prismaService.todo.findUnique.mockResolvedValue(null);

      const result = await service.getTodoById(1);
      expect(result.isErr()).toBe(true);
      expect(result._unsafeUnwrapErr().message).toBe('Todo not found');
    });

    it('should return an error if there is a database error', async () => {
      prismaService.todo.findUnique.mockRejectedValue(new Error('DB error'));

      const result = await service.getTodoById(1);
      expect(result.isErr()).toBe(true);
      expect(result._unsafeUnwrapErr().message).toContain('Failed to fetch todo');
    });
  });
});
