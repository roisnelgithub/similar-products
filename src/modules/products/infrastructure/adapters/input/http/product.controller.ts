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

import { GetSimilarParamsDto, ProductDetailDto, SimilarProductsResponseDto } from "./dtos/product-similar.dto";
import { IGetSimilarProductsUseCase } from "src/modules/products/application/ports/input/get-similar-products.use-case";
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
@ApiTags('products')
@Controller('product')
export class ProductSimilarController {
  constructor(
    @Inject(IGetSimilarProductsUseCase)
    private readonly getSimilarUseCase: IGetSimilarProductsUseCase,
  ) { }

  @Get(':productId/similar')
  @HttpCode(200)
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  @ApiOperation({ summary: 'Get similar products by productId' })
  @ApiParam({ name: 'productId', description: 'ID of the product to query', example: '1' })
  @ApiResponse({ status: 200, description: 'List of similar products', type: [ProductDetailDto] })
  @ApiResponse({ status: 400, description: 'productId is required' })
  @ApiResponse({ status: 404, description: 'Product not found' })
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