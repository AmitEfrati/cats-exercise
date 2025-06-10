import cors from '@fastify/cors';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';

async function bootstrap() {
  try {
    const fastifyAdapter = new FastifyAdapter();
    await fastifyAdapter.register(cors, {
      origin: 'http://localhost:3000',
    });

    const app = await NestFactory.create<NestFastifyApplication>(
      AppModule,
      fastifyAdapter,
    );

    app.useGlobalPipes(new ValidationPipe());

    await app.listen(3001, '0.0.0.0');
  } catch (error) {
    console.error('Error during application bootstrap:', error);
    process.exit(1);
  }
}
void bootstrap();
