import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AutoIncrement,
  DataType,
  HasMany,
} from 'sequelize-typescript';
import { Mouse } from './mouse.model';

@Table
export class Cat extends Model<Cat> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare id: number;

  @Column(DataType.STRING)
  declare firstName: string;

  @Column(DataType.STRING)
  declare lastName: string;

  @Column(DataType.STRING)
  declare image: string;

  @Column(DataType.STRING)
  declare description: string;

  @HasMany(() => Mouse)
  declare mice: Mouse[];
}
