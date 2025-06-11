import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CatsModule } from './modules/cats/cats/cats.module';
import { Cat } from './models/cat.model';
import { Mouse } from './models/mouse.model';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'cats_user',
      password: 'cats_pass',
      database: 'cats_db',
      models: [Cat, Mouse],
      autoLoadModels: true,
      synchronize: true,
    }),
    CatsModule,
  ],
})
export class AppModule {}
