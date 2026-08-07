import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
  Min,
  IsMongoId,
} from 'class-validator';
import { Type } from 'class-transformer';

class OrderProductDto {
  @IsString()
  @IsNotEmpty()
  @IsMongoId()
  productId!: string;

  @IsNumber()
  @Min(1)
  count!: number;
}

export class OrderDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderProductDto)
  products!: OrderProductDto[];

  @IsString()
  @IsNotEmpty()
  address!: string;

  @IsString()
  @IsNotEmpty()
  phoneNumber!: string;

  @IsOptional()
  @IsString()
  paymentId?: string;
}
