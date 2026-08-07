import { IsOptional, IsNumber, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class productDto {
  @IsString()
  name!: string;

  @Type(() => Number)
  @IsNumber()
  price!: number;

  @IsString()
  description!: string;

  @Type(() => Number)
  @IsNumber()
  rate!: number;

  @IsOptional()
  @IsString()
  image?: string;
}
