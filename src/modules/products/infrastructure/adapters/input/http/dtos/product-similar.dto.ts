import { IsBoolean, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class GetSimilarParamsDto {
  @IsString()
  @IsNotEmpty()
  productId!: string;
}

export class ProductDetailDto {
  @IsString()
  @IsNotEmpty()
  id!: string;

  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsNumber()
  price!: number;

  @IsBoolean()
  availability!: boolean;
}

export type SimilarProductsResponseDto = ProductDetailDto[];