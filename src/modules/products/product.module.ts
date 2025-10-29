import { Module } from '@nestjs/common';
import { ISimilarProductsService } from './application/ports/output/similar-products.service';
import { IProductService } from './application/ports/output/product.service';
import { IGetSimilarProductsUseCase } from './application/ports/input/get-similar-products.use-case';
import { GetSimilarProductsUseCaseImpl } from './application/use-cases/get-similar-products.impl';
import { HttpSimilarProductsServiceAdapter } from './infrastructure/adapters/output/http/http-similar-products-service.adapter';
import { HttpProductServiceAdapter } from './infrastructure/adapters/output/http/http-product-service.adapter';
import { ProductSimilarController } from './infrastructure/adapters/input/http/product.controller';

@Module({
  imports: [],
  controllers: [ProductSimilarController],
  providers: [
    { provide: IGetSimilarProductsUseCase, useClass: GetSimilarProductsUseCaseImpl },

    { provide: ISimilarProductsService, useClass: HttpSimilarProductsServiceAdapter },
    { provide: IProductService, useClass: HttpProductServiceAdapter },
  ],
  exports: [IGetSimilarProductsUseCase],
})
export class ProductModule { }
