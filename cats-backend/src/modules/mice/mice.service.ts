import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Mouse } from 'src/models/mouse.model';

@Injectable()
export class MiceService {
  constructor(
    @InjectModel(Mouse)
    private mouseModel: typeof Mouse,
  ) {}

  async deleteMouse(id: number): Promise<number> {
    return this.mouseModel.destroy({
      where: { id },
    });
  }
}
