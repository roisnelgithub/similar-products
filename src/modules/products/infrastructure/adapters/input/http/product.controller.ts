import {
  BadRequestException,
  Controller,
  Get,
  HttpCode,
  Inject,
  NotFoundException,
  Param,
  UsePipes,
  ValidationPipe
} from "@nestjs/common";

import { GetSimilarParamsDto, SimilarProductsResponseDto } from "./dtos/product-similar.dto";
import { IGetSimilarProductsUseCase } from "src/modules/products/application/ports/input/get-similar-products.use-case";

@Controller('product')
export class ProductSimilarController {
  constructor(
    @Inject(IGetSimilarProductsUseCase)
    private readonly getSimilarUseCase: IGetSimilarProductsUseCase,
  ) { }

  @Get(':productId/similar')
  @HttpCode(200)
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  async getSimilar(
    @Param() params: GetSimilarParamsDto,
  ): Promise<SimilarProductsResponseDto> {
    const { productId } = params;

    if (!productId || productId.trim() === '') {
      throw new BadRequestException('productId is required');
    }

    try {
      const similarProducts = await this.getSimilarUseCase.execute(productId);

      if (!similarProducts) {
        throw new NotFoundException(`Product ${productId} not found`);
      }

      return similarProducts;
    } catch (err) {
      if (err && (err.name === 'ProductNotFound' || err instanceof NotFoundException)) {
        throw new NotFoundException(err.message || `Product ${productId} not found`);
      }


      if (err && err.getStatus && typeof err.getStatus === 'function') {
        throw err;
      }

      throw err;
    }
  }
}