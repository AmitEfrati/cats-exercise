import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Mouse } from 'src/models/mouse.model';
import { MiceController } from './mice.controller';
import { MiceService } from './mice.service';

@Module({
  imports: [SequelizeModule.forFeature([Mouse])],
  controllers: [MiceController],
  providers: [MiceService],
})
export class MiceModule {}
