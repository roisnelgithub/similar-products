import { Product } from "../../../domain/models/product";

export const IProductService = Symbol('ProductService');

export interface IProductService {
  getProductById(productId: string): Promise<Product | null>;
}
