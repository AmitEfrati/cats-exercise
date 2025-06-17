import {
  Table,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
  Index,
} from 'sequelize-typescript';
import { Cat } from './cat.model';
import { BaseModel } from './base.model';

@Table
export class Mouse extends BaseModel {
  @Index
  @Column({ type: DataType.STRING, allowNull: false })
  declare name: string;

  @ForeignKey(() => Cat)
  @Column(DataType.INTEGER)
  declare catId: number;

  @BelongsTo(() => Cat)
  declare cat: Cat;
}
