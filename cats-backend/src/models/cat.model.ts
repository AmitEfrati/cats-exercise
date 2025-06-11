import { Table, Column, DataType, HasMany, Index } from 'sequelize-typescript';
import { Mouse } from './mouse.model';
import { BaseModel } from './base.model';

@Table({ tableName: 'cats' })
export class Cat extends BaseModel<Cat> {
  @Index
  @Column({ type: DataType.STRING, allowNull: false })
  declare firstName: string;

  @Index
  @Column({ type: DataType.STRING, allowNull: false })
  declare lastName: string;

  @Column(DataType.STRING)
  declare image: string;

  @Column(DataType.STRING)
  declare description: string;

  @HasMany(() => Mouse, { onDelete: 'CASCADE' })
  declare mice: Mouse[];
}
