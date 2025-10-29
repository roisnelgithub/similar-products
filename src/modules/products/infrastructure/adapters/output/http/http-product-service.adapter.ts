import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { IProductService } from 'src/modules/products/application/ports/output/product.service';
import { Product } from 'src/modules/products/domain/models/product';
import { ProductDto } from '../../input/http/dtos/product.dto';
import { ProductMapper } from '../../input/http/mappers/product.mapper';

@Injectable()
export class HttpProductServiceAdapter implements IProductService {
  private readonly baseUrl = 'http://localhost:3001';

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
