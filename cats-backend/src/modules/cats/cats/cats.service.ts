import { Cat } from 'src/models/cat.model';
import { Mouse } from 'src/models/mouse.model';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateCatDto } from './dto/create-cat.dto';
import { CreationAttributes } from 'sequelize';

@Injectable()
export class CatsService {
  constructor(
    @InjectModel(Cat)
    private catModel: typeof Cat,

    @InjectModel(Mouse)
    private mouseModel: typeof Mouse,
  ) {}

  async findAll(): Promise<Cat[]> {
    return this.catModel.findAll({
      include: [{ model: Mouse }],
    });
  }

  async create(data: CreateCatDto): Promise<Cat> {
    try {
      const { mice = [], ...catData } = data;

      const cat = await this.catModel.create(
        catData as CreationAttributes<Cat>,
      );

      if (mice?.length) {
        const miceInstances = mice.map((mouse) => ({
          name: mouse.name,
          catId: cat.id,
        }));
        await this.mouseModel.bulkCreate(
          miceInstances as CreationAttributes<Mouse>[],
        );
      }
      return cat;
    } catch (error) {
      console.error('Error creating cat:', error);
      throw error;
    }
  }
}
