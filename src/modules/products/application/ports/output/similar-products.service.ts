export const ISimilarProductsService = Symbol('SimilarProductsService');

export interface ISimilarProductsService {
  getSimilarIds(productId: string): Promise<string[] | null>;
}