import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class GetSimilarParamsDto {
  @ApiProperty({ description: 'ID of the product to query', example: '1' })
  @IsString()
  @IsNotEmpty()
  productId!: string;
}

export class ProductDetailDto {
  @ApiProperty({ description: 'Product ID', example: '1' })
  @IsString()
  @IsNotEmpty()
  id!: string;

  @ApiProperty({ description: 'Product name', example: 'Product A' })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiProperty({ description: 'Product price', example: 100 })
  @IsNumber()
  price!: number;

  @ApiProperty({ description: 'Product availability', example: true })
  @IsBoolean()
  availability!: boolean;
}

export type SimilarProductsResponseDto = ProductDetailDto[];
