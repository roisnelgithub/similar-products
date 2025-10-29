import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { ISimilarProductsService } from 'src/modules/products/application/ports/output/similar-products.service';

@Injectable()
export class HttpSimilarProductsServiceAdapter implements ISimilarProductsService {
  private readonly baseUrl = 'http://localhost:3001';

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
