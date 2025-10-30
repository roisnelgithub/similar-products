import { Product } from "../../../domain/models/product";

export const IGetSimilarProductsUseCase = Symbol('GetSimilarProductsUseCase');

export interface IGetSimilarProductsUseCase {
  execute(productId: string): Promise<Product[]>;
}
