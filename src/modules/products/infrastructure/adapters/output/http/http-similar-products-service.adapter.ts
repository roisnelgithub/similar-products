import axios from 'axios';
import { Inject, Injectable } from '@nestjs/common';

import { PRODUCT_SERVICE_URL } from 'src/config/provider';
import { ISimilarProductsService } from 'src/modules/products/application/ports/output/similar-products.service';

@Injectable()
export class HttpSimilarProductsServiceAdapter implements ISimilarProductsService {
  constructor(@Inject(PRODUCT_SERVICE_URL) private readonly baseUrl: string) { }

  async getSimilarIds(productId: string): Promise<string[] | null> {
    try {
      const response = await axios.get<string[]>(`${this.baseUrl}/product/${productId}/similarids`);
      return response.data;
    } catch (err: any) {
      if (err.response?.status === 404) return null;
      throw err;
    }
  }
}
