import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';

describe('TodoController (e2e)', () => {
  let app: INestApplication;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    prismaService = app.get<PrismaService>(PrismaService);
  });

  afterEach(async () => {
    await prismaService.todo.deleteMany({});
  });

  it('/todos/:id (GET)', async () => {
    const todo = await prismaService.todo.create({
      data: { title: 'Test Todo', completed: false },
    });

    const response = await request(app.getHttpServer()).get(`/todos/${todo.id}`).expect(200);

    expect(response.body).toEqual(
      expect.objectContaining({
        id: todo.id,
        title: 'Test Todo',
        completed: false,
      }),
    );
  });

  it('/todos/:id (GET) - not found', async () => {
    return request(app.getHttpServer()).get('/todos/999').expect(404).expect({
      statusCode: 404,
      message: 'Todo not found',
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
