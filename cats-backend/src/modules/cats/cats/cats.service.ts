import { Cat } from 'src/models/cat.model';
import { Mouse } from 'src/models/mouse.model';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateCatDto } from './dto/create-cat.dto';
import { CreationAttributes, Op } from 'sequelize';

@Injectable()
export class CatsService {
  constructor(
    @InjectModel(Cat)
    private catModel: typeof Cat,

    @InjectModel(Mouse)
    private mouseModel: typeof Mouse,
  ) {}

  async getCats(query: { name?: string; mouseName?: string }): Promise<Cat[]> {
    const { name, mouseName } = query;
    return this.catModel.findAll({
      attributes: ['id', 'firstName', 'lastName'],
      where: name
        ? {
            [Op.or]: [
              { firstName: { [Op.iLike]: `%${name}%` } },
              { lastName: { [Op.iLike]: `%${name}%` } },
            ],
          }
        : undefined,
      include: [
        {
          model: Mouse,
          attributes: ['id', 'name'],
          where: mouseName
            ? {
                name: {
                  [Op.iLike]: `%${mouseName}%`,
                },
              }
            : undefined,
          required: mouseName ? true : false,
        },
      ],
    });
  }

  // async getCats(): Promise<Cat[]> {
  //   return this.catModel.findAll({
  //     attributes: ['id', 'firstName', 'lastName'],
  //     include: [{ model: Mouse, attributes: ['id', 'name'] }],
  //   });
  // }

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
