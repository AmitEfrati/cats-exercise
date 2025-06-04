import { Cat } from 'src/models/cat.model';
import { Mouse } from 'src/models/mouse.model';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

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
      include: [Mouse],
    });
  }

  async create(data: {
    firstName: string;
    lastName: string;
    description: string;
    image: string;
    mice?: { name: string }[];
  }): Promise<Cat> {
    const { mice, ...catData } = data;

    const cat = await this.catModel.create(catData as any);

    if (mice?.length) {
      const miceInstances = mice.map((mouse) => ({
        ...mouse,
        catId: cat.id,
      }));
      await this.mouseModel.bulkCreate(miceInstances as any[]);
    }
    return cat;
  }
}
