import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // サンプルデータの作成
  const todos = [
    { title: 'Learn NestJS', completed: false },
    { title: 'Build a TODO app', completed: false },
    { title: 'Write tests', completed: false },
    { title: 'Deploy the app', completed: false },
  ]

  console.log('Start seeding...')

  for (const todo of todos) {
    const createdTodo = await prisma.todo.create({
      data: todo,
    })
    console.log(`Created todo with id: ${createdTodo.id}`)
  }

  console.log('Seeding finished.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
