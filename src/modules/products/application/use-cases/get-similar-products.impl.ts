import { Inject, Injectable } from "@nestjs/common";

import { IGetSimilarProductsUseCase } from "../ports/input/get-similar-products.use-case";
import { ISimilarProductsService } from "../ports/output/similar-products.service";
import { IProductService } from "../ports/output/product.service";
import { ProductDetailDto } from "src/modules/products/infrastructure/adapters/input/http/dtos/product-similar.dto";
import { ProductMapper } from "src/modules/products/infrastructure/adapters/input/http/mappers/product.mapper";
import { ProductNotFoundError } from "src/modules/products/domain/errors/product-not-found.error";

@Injectable()
export class GetSimilarProductsUseCaseImpl implements IGetSimilarProductsUseCase {
  constructor(
    @Inject(ISimilarProductsService) private readonly similarIdsClient: ISimilarProductsService,
    @Inject(IProductService) private readonly productClient: IProductService,
  ) { }

  async execute(productId: string): Promise<ProductDetailDto[]> {
    const ids = await this.similarIdsClient.getSimilarIds(productId);

    if (ids === null) {
      throw new ProductNotFoundError(productId);
    }
    const productsRaw = await Promise.all(ids.map(id => this.productClient.getProductById(id)));

    const productsDto = productsRaw
      .filter((raw): raw is NonNullable<typeof raw> => raw !== null)
      .map(raw => ProductMapper.toResponseDto(ProductMapper.toDomain(raw)));

    return productsDto;
  }
}
