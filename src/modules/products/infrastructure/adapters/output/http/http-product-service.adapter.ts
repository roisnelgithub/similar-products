import axios from 'axios';
import { Inject, Injectable } from '@nestjs/common';

import { IProductService } from 'src/modules/products/application/ports/output/product.service';
import { Product } from 'src/modules/products/domain/models/product';
import { ProductDto } from '../../input/http/dtos/product.dto';
import { ProductMapper } from '../../input/http/mappers/product.mapper';
import { PRODUCT_SERVICE_URL } from 'src/config/provider';

@Injectable()
export class HttpProductServiceAdapter implements IProductService {
  constructor(@Inject(PRODUCT_SERVICE_URL) private readonly baseUrl: string) { }

  async getProductById(productId: string): Promise<Product | null> {
    try {
      const response = await axios.get<ProductDto>(`${this.baseUrl}/product/${productId}`);
      return ProductMapper.fromProductDto(response.data);
    } catch (err: any) {
      if (err.response?.status === 404) return null;
      throw err;
    }
  }
}
