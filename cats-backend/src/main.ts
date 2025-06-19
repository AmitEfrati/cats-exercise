// import cors from '@fastify/cors';
// import { NestFactory } from '@nestjs/core';
// import { ValidationPipe } from '@nestjs/common';
// import {
//   FastifyAdapter,
//   NestFastifyApplication,
// } from '@nestjs/platform-fastify';
// import { AppModule } from './app.module';

// async function bootstrap() {
//   try {
//     const fastifyAdapter = new FastifyAdapter();
//     await fastifyAdapter.register(cors, {
//       origin: 'http://localhost:3000',
//     });

//     const app = await NestFactory.create<NestFastifyApplication>(
//       AppModule,
//       fastifyAdapter,
//     );

//     app.useGlobalPipes(new ValidationPipe());

//     await app.listen(3001, '0.0.0.0');
//   } catch (error) {
//     console.error('Error during application bootstrap:', error);
//     process.exit(1);
//   }
// }
// void bootstrap();

// main.ts
import cors from '@fastify/cors';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { Sequelize } from 'sequelize-typescript';

async function bootstrap() {
  try {
    // 1) Create the Nest app with Fastify
    const app = await NestFactory.create<NestFastifyApplication>(
      AppModule,
      new FastifyAdapter(),
    );

    // 2) Register CORS on the Nest/ Fastify instance
    await app.register(cors, {
      origin: 'http://localhost:3000', // your React origin
      methods: [
        // explicitly allow all methods
        'GET',
        'HEAD',
        'PUT',
        'PATCH',
        'POST',
        'DELETE',
        'OPTIONS',
      ],
      allowedHeaders: ['Content-Type'], // any other headers you need
    });

    // 3) Global validation
    app.useGlobalPipes(new ValidationPipe());

    // 4) (Dev only) Drop & re-sync tables
    const sequelize = app.get(Sequelize);
    await sequelize.sync({ force: true });
    console.log('Database tables dropped & re-synced');

    // 5) Start listening
    await app.listen(3001, '0.0.0.0');
    console.log('Server listening on http://localhost:3001');
  } catch (error) {
    console.error('Error during application bootstrap:', error);
    process.exit(1);
  }
}

void bootstrap();
