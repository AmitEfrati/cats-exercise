import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AutoIncrement,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Cat } from './cat.model';

@Table
export class Mouse extends Model<Mouse> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare id: number;

  @Column(DataType.STRING)
  declare name: string;

  @ForeignKey(() => Cat)
  @Column(DataType.INTEGER)
  declare catId: number;

  @BelongsTo(() => Cat)
  declare cat: Cat;
}
