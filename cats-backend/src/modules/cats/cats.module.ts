import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Cat } from 'src/models/cat.model';
import { Mouse } from 'src/models/mouse.model';
import { CatsService } from './cats.service';
import { CatsController } from './cats.controller';

@Module({
  imports: [SequelizeModule.forFeature([Cat, Mouse])],
  controllers: [CatsController],
  providers: [CatsService],
})
export class CatsModule {}
