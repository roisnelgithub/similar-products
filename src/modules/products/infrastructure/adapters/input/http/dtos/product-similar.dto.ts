import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class GetSimilarParamsDto {
  @ApiProperty({ description: 'ID del producto a consultar', example: '1' })
  @IsString()
  @IsNotEmpty()
  productId!: string;
}

export class ProductDetailDto {
  @ApiProperty({ description: 'ID del producto', example: '1' })
  @IsString()
  @IsNotEmpty()
  id!: string;

  @ApiProperty({ description: 'Nombre del producto', example: 'Producto A' })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiProperty({ description: 'Precio del producto', example: 100 })
  @IsNumber()
  price!: number;

  @ApiProperty({ description: 'Disponibilidad del producto', example: true })
  @IsBoolean()
  availability!: boolean;
}

export type SimilarProductsResponseDto = ProductDetailDto[];