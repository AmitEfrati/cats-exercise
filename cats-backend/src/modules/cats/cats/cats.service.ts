import { Cat } from 'src/models/cat.model';
import { Mouse } from 'src/models/mouse.model';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateCatDto } from './dto/create-cat.dto';
import {
  // type CreationAttributes,
  type IncludeOptions,
  Op,
  // Sequelize,
  type WhereOptions,
} from 'sequelize';

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

    let miceWithCatIds: number[] = [];
    if (mouseName) {
      const matchingMice = await this.mouseModel.findAll({
        attributes: ['catId'],
        where: {
          name: { [Op.iLike]: `%${mouseName}%` },
        },
      });

      miceWithCatIds = Array.from(
        new Set(matchingMice.map((mouse) => mouse.catId)),
      );
      if (!miceWithCatIds.length) return [];
    }

    const catWhereClause: WhereOptions<Cat> = {};

    if (name) {
      catWhereClause[Op.or] = [
        { firstName: { [Op.iLike]: `%${name}%` } },
        { lastName: { [Op.iLike]: `%${name}%` } },
      ];
    }

    if (miceWithCatIds.length) {
      if (Object.keys(catWhereClause).length > 0) {
        catWhereClause[Op.and] = [
          catWhereClause,
          { id: { [Op.in]: miceWithCatIds } },
        ];
        delete catWhereClause[Op.or];
      } else {
        catWhereClause.id = { [Op.in]: miceWithCatIds };
      }
    }

    const includeMouse: IncludeOptions = {
      model: this.mouseModel,
      attributes: ['id', 'name'],
      required: false,
    };
    return this.catModel.findAll({
      attributes: ['id', 'firstName', 'lastName', 'description', 'image'],
      where: catWhereClause,
      include: [includeMouse],
    });
  }

  async create(data: CreateCatDto): Promise<Cat> {
    const { mice = [], ...catData } = data;

    const mousePayloads = mice
      .filter((m) => m.name.trim())
      .map((m) => ({ name: m.name }));

    try {
      const cat = await this.catModel.create(
        {
          ...catData,
          mice: mousePayloads,
        },
        {
          include: [Mouse],
        },
      );
      return cat;
    } catch (err) {
      console.log('Nested create failed', err);
      throw err;
    }
  }
}
