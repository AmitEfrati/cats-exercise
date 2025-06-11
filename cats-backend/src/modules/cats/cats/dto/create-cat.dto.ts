/* eslint-disable @typescript-eslint/no-unsafe-call */

import { IsString, IsOptional, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class MouseDto {
  @IsString()
  name: string;
}

export class CreateCatDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  image: string;

  @IsString()
  description: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => MouseDto)
  @IsOptional()
  mice?: MouseDto[];
}
